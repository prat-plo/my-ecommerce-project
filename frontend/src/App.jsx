import ProductCard from './components/ProductCard'
import Navbar from './components/Navbar'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Login from './components/Login'
import { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [products, setProducts] = useState([])
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)

  // ดึงข้อมูลสินค้า และ ตรวจสอบสถานะ Login จาก localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }

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

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
    alert('ออกจากระบบเรียบร้อย')
  }

  // ฟังก์ชันเพิ่มสินค้าลงตะกร้า
  const addToCart = (product) => {
    setCart([...cart, { title: product.title, price: product.price, qty: 1 }])
  }

  // คำนวณราคารวม
  const totalPrice = cart.reduce((sum, item) => sum + item.price, 0)

  // ฟังก์ชันส่งออเดอร์ไป backend
  const handleCheckout = async () => {
    if (cart.length === 0) return alert('กรุณาเลือกสินค้าก่อนครับ')

    try {
      const response = await axios.post('http://localhost:5000/api/orders', {
        orderItems: cart,
        totalPrice: totalPrice
      })

      if (response.status === 201) {
        alert('สั่งซื้อสำเร็จ! บันทึกออเดอร์ลงระบบเรียบร้อย')
        setCart([]) // ล้างตะกร้า
      }
    } catch (error) {
      alert('เกิดข้อผิดพลาดในการสั่งซื้อ')
      console.error(error)
    }
  }

  if (loading) return <div className="text-center mt-10">กำลังโหลด...</div>

  return (
    <div className="container mx-auto p-4">
      {/* Header แสดงสถานะล็อกอิน */}
      <header className="flex justify-between items-center mb-6 pb-4 border-b">
        <h1 className="text-2xl font-bold">E-Commerce Store</h1>
        <div>
          {user ? (
            <div className="flex items-center gap-4">
              <span className="font-semibold text-green-600">สวัสดี, {user.name}</span>
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 cursor-pointer"
              >
                ออกจากระบบ
              </button>
            </div>
          ) : (
            <span className="text-gray-500 text-sm">ยังไม่ได้เข้าสู่ระบบ</span>
          )}
        </div>
      </header>

      {/* ฟอร์ม Login (แสดงเมื่อยังไม่ได้เข้าสู่ระบบ) */}
      {!user && <Login onLoginSuccess={(userData) => setUser(userData)} />}

      {/* ส่วนแสดงสินค้าและตะกร้า */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
        <div className="md:col-span-2">
          <h2 className="text-xl font-bold mb-4">รายการสินค้าทั้งหมด</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {products.map((product) => (
              <div key={product._id} className="border p-4 rounded shadow">
                <h3 className="font-semibold text-lg">{product.title}</h3>
                <p className="text-gray-600">{product.description}</p>
                <p className="text-blue-600 font-bold mt-2">฿{product.price.toLocaleString()}</p>
                <button
                  onClick={() => addToCart(product)}
                  className="mt-3 bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 cursor-pointer"
                >
                  + ใส่ตะกร้า
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="border p-4 rounded shadow h-fit bg-gray-50">
          <h2 className="text-xl font-bold mb-3">ตะกร้าสินค้า ({cart.length})</h2>
          {cart.map((item, index) => (
            <div key={index} className="flex justify-between border-b py-2 text-sm">
              <span>{item.title}</span>
              <span>฿{item.price.toLocaleString()}</span>
            </div>
          ))}
          <div className="mt-4 pt-2 border-t font-bold text-lg flex justify-between">
            <span>ราคารวม:</span>
            <span className="text-green-600">฿{totalPrice.toLocaleString()}</span>
          </div>
          <button
            onClick={handleCheckout}
            className="w-full mt-4 bg-green-600 text-white py-2 rounded font-bold hover:bg-green-700 cursor-pointer"
          >
            ชำระเงิน (Checkout)
          </button>
        </div>
      </div>
    </div>
  )
}

export default App