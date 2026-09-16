import { useState } from 'react'
import axios from 'axios'

function Register({ onRegisterSuccess }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      return alert('รหัสผ่านและยืนยันรหัสผ่านไม่ตรงกัน')
    }

    try {
      await axios.post(
        'https://my-ecommerce-api-iowl.onrender.com/api/auth/register',
        {
          name,
          email,
          password
        }
      )

      alert('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ')

      if (onRegisterSuccess) {
        onRegisterSuccess()
      }
    } catch (error) {
      alert(
        error.response?.data?.message ||
        'สมัครสมาชิกไม่สำเร็จ'
      )
    }
  }

  return (
    <div className="max-w-md mx-auto my-8 bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-emerald-400">
        สมัครสมาชิก (Register)
      </h2>

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Name
          </label>

          <input
            type="text"
            required
            className="w-full p-2 rounded bg-slate-700 text-white"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="กรอกชื่อของคุณ"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Email
          </label>

          <input
            type="email"
            required
            className="w-full p-2 rounded bg-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Password
          </label>

          <input
            type="password"
            required
            minLength={6}
            className="w-full p-2 rounded bg-slate-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="อย่างน้อย 6 ตัวอักษร"
          />
        </div>

        <div>
          <label className="block text-sm text-slate-300 mb-1">
            Confirm Password
          </label>

          <input
            type="password"
            required
            minLength={6}
            className="w-full p-2 rounded bg-slate-700 text-white"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="กรอกรหัสผ่านอีกครั้ง"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-emerald-500 text-slate-950 py-2 rounded font-bold hover:bg-emerald-400 transition"
        >
          สมัครสมาชิก
        </button>
      </form>
    </div>
  )
}

export default Register