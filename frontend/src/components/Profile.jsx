import { useState } from 'react'
import axios from 'axios'

function Profile({ user, onProfileUpdated }) {
  const [name, setName] = useState(user?.name || '')
  const [email, setEmail] = useState(user?.email || '')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setMessage('')
    try {
      const storedUser = JSON.parse(localStorage.getItem('userInfo'))
      const response = await axios.put(
        'http://localhost:5000/api/auth/profile',
        { name, email },
        { headers: { Authorization: `Bearer ${storedUser.token}` } }
      )
      const updatedUser = {
        ...storedUser,
        ...response.data, token: storedUser.token
        }
      localStorage.setItem(
        'userInfo',
        JSON.stringify(updatedUser)
      )
      onProfileUpdated(updatedUser)
      setMessage('อัปเดตข้อมูลเรียบร้อย')
    } catch (error) {
      setMessage( error.response?.data?.message || 'เกิดข้อผิดพลาดในการอัปเดตข้อมูล' )
    }
  }

  if (!user) return null

  return (
    <div className="max-w-md mx-auto my-8 bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold text-white mb-6">
        โปรไฟล์ของฉัน
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            ชื่อ
          </label>

          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 rounded bg-slate-700 text-white"
            required
          />
        </div>

        <div className="text-sm text-slate-300">
          สถานะ:
          <span className="ml-2 font-bold text-emerald-400">
            {user.isAdmin ? 'Admin' : 'User'}
          </span>
        </div>

        <button type="submit"
          className="w-full bg-emerald-500 text-slate-950 py-2 rounded font-bold hover:bg-emerald-400"
        >
          บันทึกข้อมูล
        </button>
      </form>

      {message && (
        <p className="mt-4 text-center text-emerald-400">{message}</p>
      )}

    </div>
  )
}

export default Profile