const notFound = (req, res, next) => {
  // error when server doesnt have route that was requested
  // req.originalUrl is route that was requested
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404
    message = "Resource not found"
  }

  return res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  })
}

export { notFound, errorHandler }
