import express from "express";
import mongoose from "mongoose";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/orders
router.post("/", protect, async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { orderItems, shippingAddress } = req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({
        message: "ไม่มีรายการสินค้าในตะกร้า",
      });
    }

    if (
      !shippingAddress ||
      !shippingAddress.fullName ||
      !shippingAddress.phone ||
      !shippingAddress.address ||
      !shippingAddress.district ||
      !shippingAddress.province ||
      !shippingAddress.postalCode
    ) {
      const error = new Error("กรุณากรอกข้อมูลที่อยู่จัดส่งให้ครบถ้วน");
      error.statusCode = 400;
      throw error;
    }

    session.startTransaction();

    let totalPrice = 0;
    const verifiedItems = [];

    for (const item of orderItems) {
      if (!item.product || !item.qty || item.qty <= 0) {
        const error = new Error("ข้อมูลสินค้าในคำสั่งซื้อไม่ถูกต้อง");
        error.statusCode = 400;
        throw error;
      }

      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error(`ไม่พบสินค้า ID: ${item.product}`);
      }

      if (product.stock < item.qty) {
        const error = new Error(`สินค้า ${product.title} มีไม่เพียงพอ`);
        error.statusCode = 400;
        throw error;
      }

      const itemTotal = product.price * item.qty;
      totalPrice += itemTotal;

      product.stock -= item.qty;

      await product.save({ session });

      verifiedItems.push({
        product: product._id,
        title: product.title,
        price: product.price,
        qty: item.qty,
      });
    }

    const order = new Order({
      orderItems: verifiedItems,
      totalPrice,
      user: req.user._id,
      shippingAddress,
    });

    const createdOrder = await order.save({ session });

    await session.commitTransaction();
    session.endSession();

    res.status(201).json(createdOrder);
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
});

export default router;
