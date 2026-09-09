import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware สำหรับอ่าน JSON Body จาก Request
app.use(express.json())

// เชื่อมต่อ MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected Successfully!'))
  .catch((err) => console.error('MongoDB Connection Error:', err))

/*/ ข้อมูลจำลองรายการสินค้า (Mock Data)
const products = [
  { id: 1, title: "เสื้อยืด Oversize สีดำ", price: 390, category: "Clothing", description: "ผ้านุ่ม ใส่สบาย ไม่ร้อน เหมาะกับอากาศเมืองไทย" },
  { id: 2, title: "กางเกงยีนส์ทรงทรงกระบอก", price: 890, category: "Clothing", description: "ผ้ายีนส์แท้ ทรงสวย เข้าได้กับทุกชุด" },
  { id: 3, title: "หูฟังไร้สาย Bluetooth", price: 1290, category: "Gadget", description: "เสียงดี เบสแน่น ตัดเสียงรบกวนได้เยี่ยม" },
  { id: 4, title: "คีย์บอร์ดกลไก Mechanical", price: 2500, category: "Gadget", description: "ไฟ RGB ปรับแต่งสวิตช์ได้ พิมพ์สนุกสะใจ" },
  { id: 5, title: "นาฬิกา Chronos Horizon", price: 8900, category: "Gadget", description: "นาฬิกาข้อมือระบบออโตเมติกดีไซน์มินิมอล" }
]*/

// Route พื้นฐานสำหรับทดสอบ API เส้นแรก
app.get('/', (req, res) => {
  res.send('Hello World! Server Is Running...')
})

// API Endpoint สำหรับส่งข้อมูลสินค้าทั้งหมด
app.get('/api/products', (req, res) => {
  res.json(products)
})

// เปิด Server ให้รอ Request ที่ PORT 5000
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})