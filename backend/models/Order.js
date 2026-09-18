import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  // เลขที่คำสั่งซื้อ
  orderNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },

  // User เจ้าของ Order
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  // รายการสินค้า
  orderItems: [
    {
      title: {
        type: String,
        required: true,
        trim: true,
      },
      price: {
        type: Number,
        required: true,
        min: 0,
      },
      qty: {
        type: Number,
        required: true,
        min: 1,
      },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  // ราคารวม
  totalPrice: {
    type: Number,
    required: true,
    min: 0,
  },

  // Snapshot ที่อยู่ตอนสั่งซื้อ
  shippingAddress: {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    district: {
      type: String,
      required: true,
      trim: true,
    },
    province: {
      type: String,
      required: true,
      trim: true,
    },
    postalCode: {
      type: String,
      required: true,
      trim: true,
    },
  },

  // เวลาสร้าง Order
  createdAt: {
    type: Date,
    default: Date.now,
  },

  // เวลาแก้ไข Order ล่าสุด
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.model("Order", orderSchema);
