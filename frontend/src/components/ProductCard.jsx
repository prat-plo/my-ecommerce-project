function ProductCard({ title, price, category, description, onAddToCart }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg text-white max-w-sm w-80">
      <div className="bg-slate-700 h-48 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium">
        [ Image Placeholder ]
      </div>
      
      {/* ใช้ตัวแปร category */}
      <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
        {category}
      </span>

      {/* ใช้ตัวแปร title และ description */}
      <h3 className="text-xl font-bold mt-2 text-slate-100">{title}</h3>
      <p className="text-slate-400 text-sm mt-1">{description}</p>
      
      <div className="flex items-center justify-between mt-4">
        {/* ใช้ตัวแปร price */}
        <span className="text-2xl font-bold text-emerald-400">{price} ฿</span>
        <button 
          onClick={onAddToCart} 
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition active:scale-95">
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  )
}

export default ProductCard