import { useState } from 'react'
import axios from 'axios'

function Admin({ onProductAdded }) {
  const [title, setTitle] = useState('')
  const [price, setPrice] = useState('')
  const [category, setCategory] = useState('Clothing')
  const [description, setDescription] = useState('')
  const [imageFile, setImageFile] = useState(null)
  const [imagePreview, setImagePreview] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const storedUser = localStorage.getItem('userInfo')
      const token = storedUser ? JSON.parse(storedUser).token : ''

      const config = {
        headers: { Authorization: `Bearer ${token}` }
      }

      let imageUrl = ''

      // 1. Upload image
      if (imageFile) {
        const formData = new FormData()
        formData.append('image', imageFile)

        const uploadResponse = await axios.post(
          'https://my-ecommerce-api-iowl.onrender.com/api/upload',
          formData,
          config
        )

        imageUrl = uploadResponse.data.imageUrl
      }

      // 2. Create product
      const response = await axios.post(
        'https://my-ecommerce-api-iowl.onrender.com/api/products',
        { title, price: Number(price), category, description, image: imageUrl },
        
        config
      )

      if (response.status === 201) {
        alert('เพิ่มสินค้าใหม่สำเร็จ!')
        setTitle('')
        setPrice('')
        setDescription('')
        if (onProductAdded) onProductAdded()
      }
    } catch (error) {
      alert(error.response?.data?.message || 'เกิดข้อผิดพลาดในการเพิ่มสินค้า')
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-6 text-white shadow-xl my-8">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
        ⚙️ แผงควบคุมผู้ดูแลระบบ (Admin Panel)
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">เพิ่มสินค้าใหม่เข้าคลัง</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">ชื่อสินค้า</label>
            <input 
              type="text" 
              required
              placeholder="เช่น เสื้อเชิ้ตแขนยาว" 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">ราคา (บาท)</label>
            <input 
              type="number" 
              required
              placeholder="เช่น 590" 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">หมวดหมู่</label>
          <select 
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-slate-300"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Clothing">Clothing</option>
            <option value="Gadget">Gadget</option>
            <option value="Footwear">Footwear</option>
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">รายละเอียดสินค้า</label>
          <textarea
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-white"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">รูปสินค้า</label>

         <input type="file"
            accept="image/*"
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-white"
            onChange={(e) => {
            const file = e.target.files[0]
              if (!file) return
              setImageFile(file)
              setImagePreview(URL.createObjectURL(file))
            }}
         />

          {imagePreview && (
           <img
              src={imagePreview}
              alt="Preview"
              className="mt-3 w-40 h-40 object-cover rounded-lg"
            />
          )}
        </div>

        <button 
          type="submit" 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg transition cursor-pointer"
        >
          + บันทึกสินค้าเข้าระบบ
        </button>
      </form>
    </div>
  )
}

export default Admin