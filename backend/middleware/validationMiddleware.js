const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: 'Name is required'
    })
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: 'Name must be at least 2 characters'
    })
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      message: 'Valid email is required'
    })
  }

  if (!password || password.length < 6) {
    return res.status(400).json({
      message: 'Password must be at least 6 characters'
    })
  }

  next()
}

export const validateLogin = (req, res, next) => {
  const { email, password } = req.body

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      message: 'Valid email is required'
    })
  }

  if (!password) {
    return res.status(400).json({
      message: 'Password is required'
    })
  }

  next()
}

export const validateProfile = (req, res, next) => {
  const { name, email } = req.body

  if (!name || !name.trim()) {
    return res.status(400).json({
      message: 'Name is required'
    })
  }

  if (name.trim().length < 2) {
    return res.status(400).json({
      message: 'Name must be at least 2 characters'
    })
  }

  if (!email || !isValidEmail(email)) {
    return res.status(400).json({
      message: 'Valid email is required'
    })
  }

  next()
}

export const validateProduct = (req, res, next) => {
  const {
    title,
    price,
    category,
    description,
    stock
  } = req.body

  if (!title || !title.trim()) {
    return res.status(400).json({
      message: 'Product title is required'
    })
  }

  if (title.trim().length < 2) {
    return res.status(400).json({
      message: 'Product title must be at least 2 characters'
    })
  }

  if (price === undefined || price === null || price === '') {
    return res.status(400).json({
      message: 'Price is required'
    })
  }

  if (!Number.isFinite(Number(price)) || Number(price) < 0) {
    return res.status(400).json({
      message: 'Price must be a valid number greater than or equal to 0'
    })
  }

  if (!category || !category.trim()) {
    return res.status(400).json({
      message: 'Category is required'
    })
  }

  if (!description || !description.trim()) {
    return res.status(400).json({
      message: 'Description is required'
    })
  }

  if (stock === undefined || stock === null || stock === '') {
    return res.status(400).json({
      message: 'Stock is required'
    })
  }

  if (!Number.isInteger(Number(stock)) || Number(stock) < 0) {
    return res.status(400).json({
      message: 'Stock must be a whole number greater than or equal to 0'
    })
  }

  next()
}