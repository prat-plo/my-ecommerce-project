import { useState } from "react";
import axios from "axios";

function Login({ onLoginSuccess }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://my-ecommerce-api-iowl.onrender.com/api/auth/login",
        {
          email,
          password,
        },
      );

      // บันทึก User Info และ Token ลง localStorage
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      alert("เข้าสู่ระบบสำเร็จ!");
      onLoginSuccess(response.data);
    } catch (error) {
      alert(error.response?.data?.message || "เข้าสู่ระบบไม่สำเร็จ");
    }
  };

  return (
    <div className="max-w-md mx-auto my-8 bg-slate-800 p-6 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center">
        เข้าสู่ระบบ (Login)
      </h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <div>
          <label className="block text-sm text-slate-300 mb-1">Email</label>
          <input
            type="email"
            required
            className="w-full p-2 rounded bg-slate-700 text-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-300 mb-1">Password</label>
          <input
            type="password"
            required
            className="w-full p-2 rounded bg-slate-700 text-white"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-emerald-500 text-slate-950 py-2 rounded font-bold hover:bg-emerald-400"
        >
          เข้าสู่ระบบ
        </button>
      </form>
    </div>
  );
}

export default Login;
