import { useEffect, useState } from "react";
import axios from "axios";

function ShippingAddress({ onConfirm, onCancel }) {
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);

  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    address: "",
    district: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem("userInfo"));

        if (!storedUser?.token) {
          setLoadingAddresses(false);
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/addresses",
          {
            headers: {
              Authorization: `Bearer ${storedUser.token}`,
            },
          },
        );

        setAddresses(response.data || []);
      } catch (error) {
        console.error("ไม่สามารถโหลดที่อยู่ได้:", error);
      } finally {
        setLoadingAddresses(false);
      }
    };

    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // เลือกที่อยู่จากโปรไฟล์
  const handleSelectAddress = (e) => {
    const selectedId = e.target.value;

    if (!selectedId) {
      return;
    }

    const selectedAddress = addresses.find((item) => item._id === selectedId);

    if (!selectedAddress) {
      return;
    }

    setFormData({
      fullName: selectedAddress.fullName || "",
      phone: selectedAddress.phone || "",
      address: selectedAddress.address || "",
      district: selectedAddress.district || "",
      province: selectedAddress.province || "",
      postalCode: selectedAddress.postalCode || "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onConfirm(formData);
  };

  return (
    <div className="max-w-4xl mx-auto mt-8 bg-slate-800 border border-slate-700 rounded-xl p-6 text-white shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400">
        📦 ที่อยู่จัดส่ง
      </h2>

      {/* เลือกที่อยู่จากโปรไฟล์ */}
      {!loadingAddresses && addresses.length > 0 && (
        <div className="mb-6 bg-slate-700 border border-slate-600 rounded-xl p-4">
          <label className="block text-sm text-slate-300 mb-2">
            📍 เลือกที่อยู่จากโปรไฟล์
          </label>

          <select
            defaultValue=""
            onChange={handleSelectAddress}
            className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
          >
            <option value="">-- เลือกที่อยู่ที่บันทึกไว้ --</option>

            {addresses.map((item) => (
              <option key={item._id} value={item._id}>
                {item.label} - {item.fullName} - {item.province}
              </option>
            ))}
          </select>

          <p className="text-xs text-slate-400 mt-2">
            เลือกที่อยู่แล้ว ระบบจะกรอกข้อมูลให้โดยอัตโนมัติ
          </p>
        </div>
      )}

      {!loadingAddresses && addresses.length === 0 && (
        <div className="mb-6 bg-slate-700 border border-slate-600 rounded-xl p-4">
          <p className="text-sm text-slate-300">
            ยังไม่มีที่อยู่ที่บันทึกไว้ในโปรไฟล์
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            ชื่อผู้รับ
          </label>

          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            placeholder="ชื่อ-นามสกุล"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            เบอร์โทรศัพท์
          </label>

          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            placeholder="0812345678"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">ที่อยู่</label>

          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            placeholder="บ้านเลขที่ / ถนน / ซอย"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-slate-300 mb-1">
              ตำบล / แขวง
            </label>

            <input
              type="text"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
              placeholder="คลองเตย"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">จังหวัด</label>

            <input
              type="text"
              name="province"
              value={formData.province}
              onChange={handleChange}
              required
              className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
              placeholder="กรุงเทพมหานคร"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            รหัสไปรษณีย์
          </label>

          <input
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            required
            maxLength="5"
            className="w-full p-3 rounded-lg bg-slate-700 text-white border border-slate-600"
            placeholder="10110"
          />
        </div>

        <div className="flex gap-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg transition"
          >
            ยกเลิก
          </button>

          <button
            type="submit"
            className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 rounded-lg transition"
          >
            ยืนยันที่อยู่และสั่งซื้อ
          </button>
        </div>
      </form>
    </div>
  );
}

export default ShippingAddress;
