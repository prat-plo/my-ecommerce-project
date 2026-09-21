import { useEffect, useState } from "react";
import axios from "axios";

function OrderHistory() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const storedUser = localStorage.getItem("userInfo");

        if (!storedUser) {
          setLoading(false);
          return;
        }

        const token = JSON.parse(storedUser).token;

        const response = await axios.get(
          "https://my-ecommerce-api-iowl.onrender.com/api/orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setOrders(response.data);
      } catch (error) {
        console.error("Order History error:", error);

        setErrorMessage(
          error.response?.data?.message || "ไม่สามารถโหลดประวัติคำสั่งซื้อได้",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto my-8 bg-slate-800 p-6 rounded-xl">
        <p className="text-center text-emerald-400">
          กำลังโหลดประวัติคำสั่งซื้อ...
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto my-8">
      <h2 className="text-2xl font-bold text-white mb-6">ประวัติการสั่งซื้อ</h2>

      {errorMessage && (
        <div className="bg-red-500/10 border border-red-500 text-red-400 p-4 rounded-lg mb-6">
          {errorMessage}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-slate-800 p-6 rounded-xl text-center">
          <p className="text-slate-400">ยังไม่มีประวัติการสั่งซื้อ</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-slate-800 p-6 rounded-xl shadow-lg"
            >
              <div className="flex flex-col md:flex-row md:justify-between gap-2 mb-4">
                <div>
                  <p className="text-slate-400 text-sm">เลขที่คำสั่งซื้อ</p>

                  <p className="text-emerald-400 font-bold">
                    {order.orderNumber}
                  </p>
                </div>

                <div className="text-sm text-slate-400">
                  {new Date(order.createdAt).toLocaleString("th-TH")}
                </div>
              </div>

              <div className="border-t border-slate-700 pt-4">
                <p className="text-white font-bold mb-3">รายการสินค้า</p>

                <div className="space-y-2">
                  {order.orderItems.map((item, index) => (
                    <div
                      key={index}
                      className="flex justify-between gap-4 text-slate-300"
                    >
                      <span>
                        {item.title} x {item.qty}
                      </span>

                      <span>
                        ฿{(item.price * item.qty).toLocaleString("th-TH")}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-700 mt-4 pt-4">
                <p className="text-white font-bold">
                  รวมทั้งหมด:
                  <span className="text-emerald-400 ml-2">
                    ฿{order.totalPrice.toLocaleString("th-TH")}
                  </span>
                </p>
              </div>

              <div className="border-t border-slate-700 mt-4 pt-4">
                <p className="text-white font-bold mb-2">ที่อยู่จัดส่ง</p>

                <div className="text-slate-300 text-sm space-y-1">
                  <p>{order.shippingAddress?.fullName || "-"}</p>
                  <p>{order.shippingAddress?.phone || "-"}</p>
                  <p>{order.shippingAddress?.address || "-"}</p>
                  <p>
                    {order.shippingAddress?.district || "-"},{" "}
                    {order.shippingAddress?.province || "-"}
                  </p>
                  <p>{order.shippingAddress?.postalCode || "-"}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
