import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

// GET /api/addresses
// ดูที่อยู่ทั้งหมดของ User ที่ login อยู่
router.get("/", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("addresses");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.json(user.addresses || []);
  } catch (error) {
    next(error);
  }
});

// POST /api/addresses
// เพิ่มที่อยู่ใหม่
router.post("/", protect, async (req, res, next) => {
  try {
    const { label, fullName, phone, address, district, province, postalCode } =
      req.body;

    if (
      !label ||
      !fullName ||
      !phone ||
      !address ||
      !district ||
      !province ||
      !postalCode
    ) {
      return res.status(400).json({
        message: "กรุณากรอกข้อมูลที่อยู่ให้ครบ",
      });
    }

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    user.addresses.push({
      label,
      fullName,
      phone,
      address,
      district,
      province,
      postalCode,
    });

    await user.save();

    const newAddress = user.addresses[user.addresses.length - 1];

    res.status(201).json(newAddress);
  } catch (error) {
    next(error);
  }
});

// PUT /api/addresses/:id
// แก้ไขที่อยู่
router.put("/:id", protect, async (req, res, next) => {
  try {
    const { label, fullName, phone, address, district, province, postalCode } =
      req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const savedAddress = user.addresses.id(req.params.id);

    if (!savedAddress) {
      return res.status(404).json({
        message: "ไม่พบที่อยู่นี้",
      });
    }

    savedAddress.label = label;
    savedAddress.fullName = fullName;
    savedAddress.phone = phone;
    savedAddress.address = address;
    savedAddress.district = district;
    savedAddress.province = province;
    savedAddress.postalCode = postalCode;

    await user.save();

    res.json(savedAddress);
  } catch (error) {
    next(error);
  }
});

// DELETE /api/addresses/:id
// ลบที่อยู่
router.delete("/:id", protect, async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const savedAddress = user.addresses.id(req.params.id);

    if (!savedAddress) {
      return res.status(404).json({
        message: "ไม่พบที่อยู่นี้",
      });
    }

    savedAddress.deleteOne();

    await user.save();

    res.json({
      message: "ลบที่อยู่เรียบร้อย",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
