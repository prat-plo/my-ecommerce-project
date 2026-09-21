import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "https://my-ecommerce-api-iowl.onrender.com/api/addresses";

const emptyForm = {
  label: "",
  fullName: "",
  phone: "",
  address: "",
  district: "",
  province: "",
  postalCode: "",
};

function AddressManager() {
  const [addresses, setAddresses] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const getConfig = () => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));

    return {
      headers: {
        Authorization: `Bearer ${storedUser.token}`,
      },
    };
  };

  const fetchAddresses = async () => {
    try {
      setLoading(true);

      const response = await axios.get(API_URL, getConfig());

      setAddresses(response.data.addresses || response.data || []);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "ไม่สามารถโหลดข้อมูลที่อยู่ได้",
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOpenAddForm = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
    setShowForm(true);
  };

  const handleEdit = (address) => {
    setEditingId(address._id);

    setFormData({
      label: address.label || "",
      fullName: address.fullName || "",
      phone: address.phone || "",
      address: address.address || "",
      district: address.district || "",
      province: address.province || "",
      postalCode: address.postalCode || "",
    });

    setMessage("");
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(emptyForm);
    setMessage("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      if (editingId) {
        await axios.put(`${API_URL}/${editingId}`, formData, getConfig());

        setMessage("แก้ไขที่อยู่เรียบร้อย");
      } else {
        await axios.post(API_URL, formData, getConfig());

        setMessage("เพิ่มที่อยู่เรียบร้อย");
      }

      await fetchAddresses();

      setShowForm(false);
      setEditingId(null);
      setFormData(emptyForm);
    } catch (error) {
      setMessage(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการบันทึกที่อยู่",
      );
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("ต้องการลบที่อยู่นี้หรือไม่?");

    if (!confirmed) {
      return;
    }

    try {
      await axios.delete(`${API_URL}/${id}`, getConfig());

      setAddresses((prev) => prev.filter((address) => address._id !== id));

      setMessage("ลบที่อยู่เรียบร้อย");
    } catch (error) {
      setMessage(
        error.response?.data?.message || "เกิดข้อผิดพลาดในการลบที่อยู่",
      );
    }
  };

  if (loading) {
    return (
      <div className="mt-8 bg-slate-800 p-6 rounded-xl shadow-lg">
        <p className="text-slate-300">กำลังโหลดที่อยู่...</p>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-slate-800 p-6 rounded-xl shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-white">📍 ที่อยู่ของฉัน</h3>

        <button
          type="button"
          onClick={handleOpenAddForm}
          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold px-4 py-2 rounded-lg"
        >
          + เพิ่มที่อยู่
        </button>
      </div>

      {message && (
        <div className="mb-4 bg-slate-700 border border-slate-600 text-emerald-400 p-3 rounded-lg">
          {message}
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="mb-8 bg-slate-700 p-5 rounded-xl space-y-4"
        >
          <h4 className="text-xl font-bold text-emerald-400">
            {editingId ? "แก้ไขที่อยู่" : "เพิ่มที่อยู่ใหม่"}
          </h4>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              ชื่อที่อยู่
            </label>

            <input
              type="text"
              name="label"
              value={formData.label}
              onChange={handleChange}
              placeholder="บ้าน / ที่ทำงาน / คอนโด"
              required
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">
              ชื่อผู้รับ
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="ชื่อ-นามสกุล"
              required
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
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
              placeholder="0812345678"
              required
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
            />
          </div>

          <div>
            <label className="block text-sm text-slate-300 mb-1">ที่อยู่</label>

            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="บ้านเลขที่ / ถนน / ซอย"
              required
              rows="3"
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
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
                placeholder="คลองเตย"
                required
                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
              />
            </div>

            <div>
              <label className="block text-sm text-slate-300 mb-1">
                จังหวัด
              </label>

              <input
                type="text"
                name="province"
                value={formData.province}
                onChange={handleChange}
                placeholder="กรุงเทพมหานคร"
                required
                className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
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
              placeholder="10110"
              maxLength="5"
              required
              className="w-full p-3 rounded-lg bg-slate-800 text-white border border-slate-600"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-3 rounded-lg"
            >
              ยกเลิก
            </button>

            <button
              type="submit"
              className="flex-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-3 rounded-lg"
            >
              {editingId ? "บันทึกการแก้ไข" : "บันทึกที่อยู่"}
            </button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !showForm ? (
        <div className="text-center py-8 border border-dashed border-slate-600 rounded-xl">
          <p className="text-slate-400 mb-4">ยังไม่มีที่อยู่ที่บันทึกไว้</p>

          <button
            type="button"
            onClick={handleOpenAddForm}
            className="text-emerald-400 hover:text-emerald-300 font-bold"
          >
            + เพิ่มที่อยู่แรก
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map((item) => (
            <div
              key={item._id}
              className="bg-slate-700 border border-slate-600 rounded-xl p-5"
            >
              <div className="flex items-center justify-between mb-3">
                <h4 className="text-lg font-bold text-emerald-400">
                  {item.label}
                </h4>
              </div>

              <div className="space-y-1 text-sm text-slate-300">
                <p>
                  <span className="text-white font-semibold">ผู้รับ:</span>{" "}
                  {item.fullName}
                </p>

                <p>
                  <span className="text-white font-semibold">โทร:</span>{" "}
                  {item.phone}
                </p>

                <p>
                  <span className="text-white font-semibold">ที่อยู่:</span>{" "}
                  {item.address}
                </p>

                <p>
                  {item.district}, {item.province} {item.postalCode}
                </p>
              </div>

              <div className="flex gap-3 mt-5">
                <button
                  type="button"
                  onClick={() => handleEdit(item)}
                  className="flex-1 bg-slate-600 hover:bg-slate-500 text-white font-bold py-2 rounded-lg"
                >
                  แก้ไข
                </button>

                <button
                  type="button"
                  onClick={() => handleDelete(item._id)}
                  className="flex-1 bg-red-500 hover:bg-red-400 text-white font-bold py-2 rounded-lg"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AddressManager;
