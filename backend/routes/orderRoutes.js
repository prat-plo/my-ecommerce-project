import express from 'express'
import Order from '../models/Order.js'

const router = express.Router()

// POST /api/orders
router.post('/', async (req, res) => {
  try {
    const { orderItems, totalPrice } = req.body

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: 'ไม่มีรายการสินค้าในตะกร้า' })
    }

    const order = new Order({ orderItems, totalPrice })
    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router