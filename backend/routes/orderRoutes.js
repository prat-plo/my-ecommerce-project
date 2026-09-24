import express from "express";
import mongoose from "mongoose";
import crypto from "crypto";
import Order from "../models/Order.js";
import Product from "../models/Product.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// POST /api/orders
// สร้างคำสั่งซื้อใหม่
router.post("/", protect, async (req, res, next) => {
  const session = await mongoose.startSession();

  try {
    const { orderItems, shippingAddress, paymentMethod } = req.body;

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

    const allowedPaymentMethods = ["cod", "bank_transfer"];

    if (paymentMethod && !allowedPaymentMethods.includes(paymentMethod)) {
      return res.status(400).json({
        message: "วิธีการชำระเงินไม่ถูกต้อง",
      });
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
        const error = new Error(`ไม่พบสินค้า ID: ${item.product}`);

        error.statusCode = 404;
        throw error;
      }

      if (product.stock < item.qty) {
        const error = new Error(`สินค้า ${product.title} มีไม่เพียงพอ`);

        error.statusCode = 400;
        throw error;
      }

      const itemTotal = product.price * item.qty;

      totalPrice += itemTotal;

      // ลด Stock
      product.stock -= item.qty;

      await product.save({ session });

      // เก็บข้อมูลสินค้า ณ เวลาที่สั่งซื้อ
      verifiedItems.push({
        product: product._id,
        title: product.title,
        price: product.price,
        qty: item.qty,
      });
    }

    // สร้างเลขที่คำสั่งซื้อ
    const orderNumber = `ORD-${Date.now()}-${crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase()}`;

    const order = new Order({
      orderNumber,
      orderItems: verifiedItems,
      totalPrice,
      user: req.user._id,
      shippingAddress,
      paymentMethod: paymentMethod || "cod",
      updatedAt: new Date(),
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

// GET /api/orders
// ดูประวัติคำสั่งซื้อของตัวเอง
router.get("/", protect, async (req, res, next) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({
      createdAt: -1,
    });

    res.json(orders);
  } catch (error) {
    next(error);
  }
});

// PATCH /api/orders/:id/status
// Admin เปลี่ยนสถานะคำสั่งซื้อ
router.patch("/:id/status", protect, async (req, res, next) => {
  try {
    if (!req.user.isAdmin) {
      return res.status(403).json({
        message: "Not authorized as an admin",
      });
    }

    const { status } = req.body;

    const allowedStatuses = [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "สถานะคำสั่งซื้อไม่ถูกต้อง",
      });
    }

    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({
        message: "ไม่พบคำสั่งซื้อ",
      });
    }

    order.status = status;
    order.updatedAt = new Date();

    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    next(error);
  }
});

// GET /api/orders/:id
// ดูรายละเอียด Order ของตัวเอง
router.get("/:id", protect, async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );

    if (!order) {
      return res.status(404).json({
        message: "ไม่พบคำสั่งซื้อ",
      });
    }

    // User ดูได้เฉพาะ Order ของตัวเอง
    // Admin ดู Order ของคนอื่นได้
    if (
      order.user._id.toString() !== req.user._id.toString() &&
      !req.user.isAdmin
    ) {
      return res.status(403).json({
        message: "ไม่มีสิทธิ์ดูคำสั่งซื้อนี้",
      });
    }

    res.json(order);
  } catch (error) {
    next(error);
  }
});

export default router;
