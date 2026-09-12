import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import Product from './models/Product.js'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from './models/User.js'
import { protect, admin } from './middleware/authMiddleware.js'
import cors from 'cors'
import orderRoutes from './routes/orderRoutes.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(express.json())
app.use(cors())
app.use('/api/orders', orderRoutes)

// เชื่อมต่อ MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err))


// --- ROUTES FOR PRODUCTS ---

// 1. READ: ดึงสินค้าทั้งหมดจากฐานข้อมูล
app.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find({})
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// 2. CREATE: เพิ่มสินค้าใหม่ลงฐานข้อมูล
app.post('/api/products', protect, admin, async (req, res) => {
  try {
    const { title, price, category, description, image } = req.body
    const newProduct = new Product({ title, price, category, description, image })
    const savedProduct = await newProduct.save()
    res.status(201).json(savedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// 3. UPDATE: แก้ไขข้อมูลสินค้าตาม ID
app.put('/api/products/:id', protect, admin, async (req, res) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true } // คืนค่าข้อมูลใหม่หลังอัปเดต
    )
    res.json(updatedProduct)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// 4. DELETE: ลบสินค้าตาม ID
app.delete('/api/products/:id', protect, admin, async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id)
    res.json({ message: 'Product deleted successfully' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// --- AUTH ROUTES ---

// 1. REGISTER: สมัครสมาชิก
app.post('/api/auth/register', async (req, res) => {
  try {
    const { name, email, password } = req.body

    // เช็คว่ามี email นี้ในระบบหรือยัง
    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' })
    }

    // เข้ารหัส Password ด้วย bcrypt
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // บันทึก User ลงฐานข้อมูล
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      isAdmin: false
    })

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// 2. LOGIN: เข้าสู่ระบบและรับ JWT Token
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body

    // ค้นหา User จาก Email
    const user = await User.findOne({ email })
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // ตรวจสอบ Password
    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' })
    }

    // สร้าง JWT Token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// เปิด Server ให้รอ Request ที่ PORT 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})