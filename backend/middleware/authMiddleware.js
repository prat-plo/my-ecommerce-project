import jwt from 'jsonwebtoken'
import User from '../models/User.js'

// 1. ดักเช็คว่าล็อกอินหรือยัง (มี Token ที่ถูกต้องไหม)
export const protect = async (req, res, next) => {
  let token

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      req.user = await User.findById(decoded.id).select('-password')
      next()
    } catch (error) {
      res.status(401).json({ message: 'Not authorized, token failed' })
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' })
  }
}

// 2. ดักเช็คว่าเป็น Admin หรือไม่
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(403).json({ message: 'Not authorized as an admin' })
  }
}