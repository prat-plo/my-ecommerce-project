function Cart({ cartItems = [], totalCartPrice = 0, onIncreaseItem, onDecreaseItem, onRemoveItem }) {
  return (
    <div className="max-w-4xl mx-auto bg-slate-800 border border-slate-700 rounded-xl p-6 text-white shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-emerald-400 flex items-center gap-2">
        🛒 ตะกร้าสินค้าของคุณ
      </h2>
      
      {cartItems.length === 0 ? (
        <p className="text-slate-400 text-center py-8">ยังไม่มีสินค้าในตะกร้า</p>
      ) : (
      <>
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div 
              key={item.id} 
              className="flex items-center justify-between bg-slate-700/50 p-4 rounded-lg border border-slate-600/50"
            >
              <div>
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="text-slate-400 text-sm">ราคา: {item.price} ฿</p>
              </div>

              <div className="flex items-center gap-4">
                {/* กลุ่มปุ่มปรับจำนวน */}
                <div className="flex items-center bg-slate-800 rounded-lg border border-slate-600 overflow-hidden">
                  <button 
                    onClick={() => onDecreaseItem(item.id)}
                    className="px-3 py-1 hover:bg-slate-700 text-slate-300 font-bold transition"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-sm font-semibold text-white">
                    {item.quantity}
                  </span>
                  <button 
                    onClick={() => onIncreaseItem(item)}
                    className="px-3 py-1 hover:bg-slate-700 text-slate-300 font-bold transition"
                  >
                    +
                  </button>
                </div>

                {/* ราคารวมของสินค้าชิ้นนี้ */}
                <span className="font-semibold text-emerald-400 text-lg min-w-[100px] text-right">
                  {item.price * item.quantity} ฿
                </span>

                {/* ปุ่มลบรายการ */}
                <button 
                  onClick={() => onRemoveItem(item.id)}
                  className="bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 px-3 py-1 rounded-lg text-xs font-semibold transition"
                >
                  ลบ
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ส่วนแสดงราคารวมสุทธิ */}
        <div className="mt-6 pt-6 border-t border-slate-700 flex justify-between items-center">
          <span className="text-slate-400 text-lg font-medium">ราคารวมทั้งหมด:</span>
          <span className="text-3xl font-extrabold text-emerald-400">
            {totalCartPrice.toLocaleString()} ฿
          </span>
        </div>
      </>
      )}
    </div>
  )
}

export default Cart