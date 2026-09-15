import { useState, useEffect } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import ProductCard from './components/ProductCard'
import Cart from './components/Cart'
import Admin from './components/Admin'
import Login from './components/Login'
import Profile from './components/Profile'

function App() {
  const [products, setProducts] = useState([])
  const [cartItems, setCartItems] = useState([])
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const handleProfileUpdated = (updatedUser) => {setUser(updatedUser)}

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        'https://my-ecommerce-api-iowl.onrender.com/api/products'
      )
      setProducts(response.data)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching products:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('userInfo')
    const token = storedUser
      ? JSON.parse(storedUser).token
      : ''

    const config = {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('userInfo')
    setUser(null)
    alert('ออกจากระบบเรียบร้อย')
  }

  const handleAddToCart = (product) => {
    const id = product._id || product.id
    const existing = cartItems.find(
      (item) => (item._id || item.id) === id
    )

    const currentQuantity = existing ? existing.quantity : 0

    if (currentQuantity >= product.stock) {
      alert('สินค้าในสต็อกไม่เพียงพอ')
      return
    }

   if (existing) {
     setCartItems(
       cartItems.map((item) =>
          (item._id || item.id) === id
            ? {...item, quantity: item.quantity + 1} : item
        )
      )
    } else {
      setCartItems([...cartItems, {...product, id, quantity: 1}])
    }
  }

  const handleDecreaseQuantity = (id) => {
    setCartItems(
      cartItems
        .map((item) =>
          (item._id || item.id) === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    )
  }

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter((item) => (item._id || item.id) !== id))
  }

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalCartPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      return alert('กรุณาเลือกสินค้าก่อนทำการสั่งซื้อ')
    }

    try {
      const storedUser = localStorage.getItem('userInfo')

     if (!storedUser) {
       return alert('กรุณาเข้าสู่ระบบก่อนทำการสั่งซื้อ')
     }

     const token = JSON.parse(storedUser).token

     const config = {
       headers: {
         Authorization: `Bearer ${token}`
       }
      }

     const orderData = {
        orderItems: cartItems.map((item) => ({
          product: item._id || item.id,
          qty: item.quantity
        }))
      }

      const response = await axios.post(
        'https://my-ecommerce-api-iowl.onrender.com/api/orders',
        orderData,
        config
     )

      if (response.status === 201) {
        alert('สั่งซื้อสำเร็จ!')
        setCartItems([])
      }

    } catch (error) {
     alert(
       error.response?.data?.message ||
       'เกิดข้อผิดพลาดในการสั่งซื้อ'
     )
   }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-emerald-400 font-bold text-xl">
        กำลังโหลดข้อมูล...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-900 p-8 text-white">
      <div className="max-w-6xl mx-auto">
        <Navbar cartCount={totalCartCount} user={user} onLogout={handleLogout} />

        {!user && <Login onLoginSuccess={(userData) => setUser(userData)} />}
        {user && (<Profile user={user} onProfileUpdated={handleProfileUpdated} />)}

        <h1 className="text-3xl font-bold mb-8 text-center text-slate-100">
          รายการสินค้าทั้งหมด 🛒
        </h1>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {products.map((item) => (
            <ProductCard
              key={item._id || item.id}
              title={item.title}
              price={item.price}
              category={item.category}
              description={item.description}
              image={item.image}
              stock={item.stock}
              onAddToCart={() => handleAddToCart(item)}
            />
          ))}
        </div>

        <Cart
          cartItems={cartItems}
          totalCartPrice={totalCartPrice}
          onIncreaseItem={handleAddToCart}
          onDecreaseItem={handleDecreaseQuantity}
          onRemoveItem={handleRemoveItem}
          onCheckout={handleCheckout}
        />

        {user && user.isAdmin && <Admin onProductAdded={fetchProducts} />}
      </div>
    </div>
  )
}

export default App