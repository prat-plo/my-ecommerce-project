import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Admin from './components/Admin'
import { useState } from 'react'

function App() {
  // สร้าง state สำหรับเก็บรายการสินค้าในตะกร้า
  const [cartItems, setCartItems] = useState([])
  const handleAddToCart = (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id)
    if (existingItem) {
      setCartItems(
        cartItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      )
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }])
    }
  }

  // ฟังก์ชันลดจำนวนสินค้า
  const handleDecreaseQuantity = (productId) => {
    setCartItems(
      cartItems
        .map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  // ฟังก์ชันลบสินค้าออกจากตะกร้าทันที
  const handleRemoveItem = (productId) => {
    setCartItems(cartItems.filter((item) => item.id !== productId))
  }

  // สร้างรายการสินค้า
  const products = [
    { id: 1, title: "เสื้อยืด Oversize สีดำ", price: 390, category: "Clothing", description: "ผ้านุ่ม ใส่สบาย ไม่ร้อน เหมาะกับอากาศเมืองไทย" },
    { id: 2, title: "กางเกงยีนส์ทรงทรงกระบอก", price: 890, category: "Clothing", description: "ผ้ายีนส์แท้ ทรงสวย เข้าได้กับทุกชุด" },
    { id: 3, title: "หูฟังไร้สาย Bluetooth", price: 1290, category: "Gadget", description: "เสียงดี เบสแน่น ตัดเสียงรบกวนได้เยี่ยม" },
    { id: 4, title: "คีย์บอร์ดกลไก Mechanical", price: 2500, category: "Gadget", description: "ไฟ RGB ปรับแต่งสวิตช์ได้ พิมพ์สนุกสะใจ" },
    { id: 5, title: "นาฬิกา Chronos Horizon", price: 8900, category: "Gadget", description: "นาฬิกาข้อมือระบบออโตเมติกดีไซน์มินิมอล" }
  ]

  // คำนวณจำนวนสินค้าทั้งหมดในตะกร้า
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  // คำนวณราคาสินค้าทั้งหมดในตะกร้า
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="min-h-screen bg-slate-900 p-8">
      <Navbar cartCount={totalCartCount} />
      <h1 className="text-3xl font-bold text-white mb-6 text-center">
        ร้านค้าออนไลน์ของฉัน 🛒
      </h1>

      <div className="flex flex-wrap justify-center gap-6">
        {products.map((item) => (
            <ProductCard
              key={item.id}
              title={item.title}
              price={item.price}
              category={item.category}
              description={item.description}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
      </div>
      <Cart cartItems={cartItems}
      totalCartPrice={totalCartPrice}
      onIncreaseItem={handleAddToCart}
      onDecreaseItem={handleDecreaseQuantity}
      onRemoveItem={handleRemoveItem}
      />
      <Admin />
    </div>
  )
}

export default App