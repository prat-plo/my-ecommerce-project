function ProductCard({ title, price, category, description, onAddToCart }) {
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-lg text-white w-80 flex flex-col justify-between">
      <div>
        <div className="bg-slate-700 h-40 rounded-lg mb-4 flex items-center justify-center text-slate-400 font-medium text-sm">
          [ Image Placeholder ]
        </div>
        
        <span className="bg-emerald-500/10 text-emerald-400 text-xs px-2.5 py-1 rounded-full font-medium">
          {category || 'General'}
        </span>

        <h3 className="text-xl font-bold mt-2 text-slate-100">{title}</h3>
        <p className="text-slate-400 text-sm mt-1 line-clamp-2">{description}</p>
      </div>

      <div className="flex items-center justify-between mt-6 pt-4 border-t border-slate-700/50">
        <span className="text-2xl font-bold text-emerald-400">
          {price ? price.toLocaleString() : 0} ฿
        </span>
        <button 
          onClick={onAddToCart} 
          className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold px-4 py-2 rounded-lg transition active:scale-95 cursor-pointer text-sm"
        >
          เพิ่มลงตะกร้า
        </button>
      </div>
    </div>
  )
}

export default ProductCard