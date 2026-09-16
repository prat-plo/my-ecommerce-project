import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  orderItems: [
    {
      title: { type: String, required: true },
      price: { type: Number, required: true },
      qty: { type: Number, required: true },
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    },
  ],

  totalPrice: { type: Number, required: true },

  shippingAddress: {
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    district: { type: String, required: true, trim: true },
    province: { type: String, required: true, trim: true },
    postalCode: { type: String, required: true, trim: true },
  },
  
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Order", orderSchema);
