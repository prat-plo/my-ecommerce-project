import { useState } from 'react'
import axios from 'axios'

function Admin({ onProductAdded }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Clothing')
  const [description, setDescription] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // ดึง Token จาก localStorage เพื่อยืนยันสิทธิ์
      const storedUser = localStorage.getItem('userInfo')
      const token = storedUser ? JSON.parse(storedUser).token : ''

      const config = {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }

      // ยิง API เพิ่มสินค้าเข้าฐานข้อมูล
      const response = await axios.post(
        'http://localhost:5000/api/products',
        { title, price: Number(price), category, description },
        config
      )

      if (response.status === 201) {
        alert('เพิ่มสินค้าใหม่สำเร็จ!')
        // รีเซ็ตฟอร์ม
        setTitle('')
        setPrice('')
        setDescription('')
        // สั่งให้หน้าหลักดึงข้อมูลสินค้าใหม่
        if (onProductAdded) onProductAdded()
      }
    } catch (error) {
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มสินค้า')
    }
  }

  return (
    <div className="max-w-4xl mx-auto my-8 p-6 border rounded shadow bg-gray-100 text-black">
      <h2 className="text-xl font-bold mb-4 text-blue-600">
        ⚙️ แผงควบคุมผู้ดูแลระบบ (Admin Panel)
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium">ชื่อสินค้า</label>
            <input
              type="text"
              required
              className="w-full border p-2 rounded mt-1 bg-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">ราคา (บาท)</label>
            <input
              type="number"
              required
              className="w-full border p-2 rounded mt-1 bg-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">หมวดหมู่</label>
          <select
            className="w-full border p-2 rounded mt-1 bg-white"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Clothing">Clothing</option>
            <option value="Gadget">Gadget</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">รายละเอียดสินค้า</label>
          <textarea
            className="w-full border p-2 rounded mt-1 bg-white"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 cursor-pointer"
        >
          + บันทึกสินค้าเข้าระบบ
        </button>
      </form>
    </div>
  )
}

export default Admin