import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  orderItems: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true }
    }
  ],
  totalPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
})

export default mongoose.model('Order', orderSchema)