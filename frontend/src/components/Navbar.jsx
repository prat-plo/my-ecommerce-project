import { useState } from 'react'

function Navbar({ cartCount }) {
  
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center text-white mb-8">
      <div className="text-xl font-bold text-emerald-400">
        My Shop 🛒
      </div>

      <button className="bg-slate-700 hover:bg-slate-600 px-4 py-2 rounded-lg text-sm font-medium transition flex items-center gap-2">
        <span>ตะกร้าสินค้า</span>
        <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-xs font-bold">
          {cartCount}
        </span>
      </button>

    </nav>
  )
}

export default Navbar