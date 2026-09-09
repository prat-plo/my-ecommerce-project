function Admin() {
  return (
    <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-6 text-white shadow-xl mt-12">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
        ⚙️ แผงควบคุมผู้ดูแลระบบ (Admin Panel)
      </h2>

      {/* ฟอร์มเพิ่มสินค้าใหม่ */}
      <form className="space-y-4 bg-slate-900/50 p-4 rounded-lg border border-slate-700/50 mb-8">
        <h3 className="text-lg font-semibold text-slate-200 mb-2">เพิ่มสินค้าใหม่เข้าคลัง</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs text-slate-400 mb-1">ชื่อสินค้า</label>
            <input 
              type="text" 
              placeholder="เช่น เสื้อเชิ้ตแขนยาว" 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
          <div>
            <label className="block text-xs text-slate-400 mb-1">ราคา (บาท)</label>
            <input 
              type="number" 
              placeholder="เช่น 590" 
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs text-slate-400 mb-1">หมวดหมู่</label>
          <select className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-emerald-500 text-slate-300">
            <option value="Clothing">Clothing</option>
            <option value="Gadget">Gadget</option>
          </select>
        </div>

        <button 
          type="button" 
          className="w-full bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold py-2.5 rounded-lg transition"
        >
          + บันทึกสินค้าเข้าระบบ
        </button>
      </form>
    </div>
  )
}

export default Admin