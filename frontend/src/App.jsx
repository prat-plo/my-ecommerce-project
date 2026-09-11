import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Admin from './components/Admin'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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

  // ดึงข้อมูลสินค้าจาก Backend เมื่อหน้าเว็บโหลด
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products')
        setProducts(response.data)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching products:', error)
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

  if (loading) return <div className="text-center mt-10">กำลังโหลดข้อมูลสินค้า...</div>

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">รายการสินค้าทั้งหมด</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded shadow">
            <h2 className="font-semibold text-lg">{product.title}</h2>
            <p className="text-gray-600">{product.description}</p>
            <p className="text-blue-600 font-bold mt-2">
              ฿{product.price.toLocaleString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  )

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