export const notFound = (req, res, next) => {
  res.status(404).json({
    message: `ไม่พบ API: ${req.method} ${req.originalUrl}`
  })
}

export const errorHandler = (err, req, res, next) => {
  console.error('ERROR:', err)

  let statusCode = err.statusCode || 500

  if (err.name === 'ValidationError') {
    statusCode = 400
  }

  if (err.name === 'CastError') {
    statusCode = 400
  }

  if (err.code === 11000) {
    statusCode = 400
  }

  res.status(statusCode).json({
    message:
      statusCode === 500
        ? 'เกิดข้อผิดพลาดภายในเซิร์ฟเวอร์'
        : err.message
  })
}