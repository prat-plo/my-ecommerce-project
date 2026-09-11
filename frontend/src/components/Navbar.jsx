function Navbar({ cartCount, user, onLogout }) {
  return (
    <nav className="bg-slate-800 border-b border-slate-700 px-6 py-4 flex justify-between items-center text-white mb-8 rounded-xl shadow-lg">
      <div className="text-xl font-bold text-emerald-400">
        My Shop 🛒
      </div>

      <div className="flex items-center gap-6">
        <div className="bg-slate-700 px-4 py-2 rounded-lg text-sm font-medium flex items-center gap-2">
          <span>ตะกร้าสินค้า</span>
          <span className="bg-emerald-500 text-slate-950 px-2 py-0.5 rounded-full text-xs font-bold">
            {cartCount}
          </span>
        </div>

        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-emerald-400 font-semibold text-sm">
              👤 {user.name} {user.isAdmin && '(Admin)'}
            </span>
            <button
              onClick={onLogout}
              className="bg-rose-500/20 text-rose-400 border border-rose-500/30 px-3 py-1 rounded-lg text-xs font-bold hover:bg-rose-500/30 transition cursor-pointer"
            >
              ออกจากระบบ
            </button>
          </div>
        ) : (
          <span className="text-slate-400 text-sm">ยังไม่ได้เข้าสู่ระบบ</span>
        )}
      </div>
    </nav>
  )
}

export default Navbar