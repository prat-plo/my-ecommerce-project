import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import API_BASE_URL from "../config/api";

const CARRIERS = {
  thailand_post: {
    label: "ไปรษณีย์ไทย",
    trackingPage: "https://track.thailandpost.co.th/",
  },
  flash: {
    label: "Flash Express",
    trackingPage: "https://www.flashexpress.co.th/",
  },
  jnt: {
    label: "J&T Express",
    trackingPage: "https://www.jtexpress.co.th/",
  },
  kex: {
    label: "KEX Express",
    trackingPage: "https://th.kex-express.com/",
  },
  other: {
    label: "อื่น ๆ",
    trackingPage: "",
  },
};

function createTrackingUrl(carrier) {
  return CARRIERS[carrier]?.trackingPage || "";
}

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [drafts, setDrafts] = useState({});
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [savingOrderId, setSavingOrderId] = useState("");

  const fetchOrders = useCallback(async () => {
    setLoading(true);
    setErrorMessage("");

    try {
      const storedUser = localStorage.getItem("userInfo");
      const token = storedUser ? JSON.parse(storedUser)?.token : "";

      const response = await axios.get(`${API_BASE_URL}/api/orders/admin`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const loadedOrders = Array.isArray(response.data) ? response.data : [];
      setOrders(loadedOrders);
      setDrafts(
        Object.fromEntries(
          loadedOrders.map((order) => [
            order._id,
            {
              status: order.status,
              carrier: order.tracking?.carrier || "",
              carrierCode: "",
              trackingNumber: order.tracking?.trackingNumber || "",
              trackingUrl: order.tracking?.trackingUrl || "",
            },
          ]),
        ),
      );
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "ไม่สามารถโหลดคำสั่งซื้อได้",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const updateDraft = (orderId, field, value) => {
    setDrafts((current) => ({
      ...current,
      [orderId]: { ...current[orderId], [field]: value },
    }));
  };

  const saveOrder = async (orderId) => {
    const draft = drafts[orderId];

    if (!draft) return;

    if (
      draft.status === "shipped" &&
      (!draft.carrier.trim() ||
        !draft.trackingNumber.trim() ||
        !draft.trackingUrl.trim())
    ) {
      setErrorMessage("ก่อนตั้งสถานะจัดส่งแล้ว กรุณากรอกข้อมูลติดตามให้ครบ");
      return;
    }

    setSavingOrderId(orderId);
    setErrorMessage("");

    try {
      const storedUser = localStorage.getItem("userInfo");
      const token = storedUser ? JSON.parse(storedUser)?.token : "";

      await axios.patch(`${API_BASE_URL}/api/orders/${orderId}/status`, draft, {
        headers: { Authorization: `Bearer ${token}` },
      });

      await fetchOrders();
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "ไม่สามารถบันทึกคำสั่งซื้อได้",
      );
    } finally {
      setSavingOrderId("");
    }
  };

  const statusLabels = {
    pending: "รอดำเนินการ",
    confirmed: "ยืนยันคำสั่งซื้อ",
    processing: "กำลังเตรียมสินค้า",
    shipped: "จัดส่งแล้ว",
    delivered: "จัดส่งสำเร็จ",
    cancelled: "ยกเลิก",
  };

  return (
    <section className="max-w-4xl mx-auto my-8 bg-slate-800 border border-slate-700 rounded-xl p-6 text-white">
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <h2 className="text-2xl font-bold text-emerald-400">
          จัดการคำสั่งซื้อ
        </h2>
        <button
          type="button"
          onClick={fetchOrders}
          className="px-4 py-2 rounded-lg bg-slate-700 hover:bg-slate-600"
        >
          โหลดใหม่
        </button>
      </div>

      {errorMessage && (
        <p className="mb-4 rounded-lg border border-red-500 bg-red-500/10 p-3 text-red-300">
          {errorMessage}
        </p>
      )}

      {loading ? (
        <p className="text-slate-300">กำลังโหลดคำสั่งซื้อ...</p>
      ) : orders.length === 0 ? (
        <p className="text-slate-400">ยังไม่มีคำสั่งซื้อ</p>
      ) : (
        <div className="space-y-5">
          {orders.map((order) => {
            const draft = drafts[order._id] || {};

            return (
              <article
                key={order._id}
                className="rounded-lg border border-slate-700 bg-slate-900/60 p-4"
              >
                <div className="mb-4 flex flex-wrap justify-between gap-2">
                  <div>
                    <p className="font-bold text-emerald-400">
                      {order.orderNumber}
                    </p>
                    <p className="text-sm text-slate-400">
                      {order.user?.name || order.user?.email || "ลูกค้า"} ·{" "}
                      {new Date(order.createdAt).toLocaleString("th-TH")}
                    </p>
                  </div>
                  <p className="text-sm text-slate-300">
                    ฿{Number(order.totalPrice).toLocaleString("th-TH")} ·{" "}
                    {statusLabels[order.status] || order.status}
                  </p>
                </div>

                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm text-slate-300">
                    สถานะ
                    <select
                      value={draft.status || order.status}
                      onChange={(event) =>
                        updateDraft(order._id, "status", event.target.value)
                      }
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                    >
                      {Object.entries(statusLabels).map(([value, label]) => (
                        <option key={value} value={value}>
                          {label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm text-slate-300">
                    บริษัทขนส่ง
                    <select
                      value={drafts[order._id]?.carrierCode || ""}
                      onChange={(event) => {
                        const carrierCode = event.target.value;
                        const carrier = CARRIERS[carrierCode];

                        setDrafts((current) => ({
                          ...current,
                          [order._id]: {
                            ...current[order._id],
                            carrierCode,
                            carrier: carrier?.label || "",
                            trackingUrl: createTrackingUrl(carrierCode),
                          },
                        }));
                      }}
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                    >
                      <option value="">เลือกบริษัทขนส่ง</option>
                      {Object.entries(CARRIERS).map(([value, item]) => (
                        <option key={value} value={value}>
                          {item.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm text-slate-300">
                    เลขพัสดุ
                    <input
                      value={draft.trackingNumber || ""}
                      onChange={(event) =>
                        updateDraft(
                          order._id,
                          "trackingNumber",
                          event.target.value,
                        )
                      }
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                    />
                  </label>

                  <label className="text-sm text-slate-300">
                    ลิงก์ติดตามพัสดุ
                    <input
                      type="url"
                      value={draft.trackingUrl || ""}
                      onChange={(event) =>
                        updateDraft(
                          order._id,
                          "trackingUrl",
                          event.target.value,
                        )
                      }
                      placeholder="ระบบจะเติมลิงก์เมื่อเลือกบริษัทขนส่ง"
                      className="mt-1 w-full rounded-lg border border-slate-700 bg-slate-800 px-3 py-2 text-white"
                    />
                  </label>
                </div>

                <button
                  type="button"
                  disabled={savingOrderId === order._id}
                  onClick={() => saveOrder(order._id)}
                  className="mt-4 rounded-lg bg-emerald-500 px-4 py-2 font-bold text-slate-950 hover:bg-emerald-400 disabled:opacity-50"
                >
                  {savingOrderId === order._id ? "กำลังบันทึก..." : "บันทึก"}
                </button>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default AdminOrders;
