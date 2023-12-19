const notFound = (req, res, next) => {
  // error when server doesnt have route that was requested 
  // req.originalUrl is route that was requested
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error)
}

const errorHandler = (err, req, res, next) => {
  // when throwing custom error status may be 200 which isn't error status code 
  // we change it to 500 
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  let message = err.message

  // mongoose error check
  if (err.name === "CastError" && err.kind === "ObjectId") {
    statusCode = 404
    message = "Resource not found"
  }

  res.status(statusCode).json({
    message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  })
}

export { notFound, errorHandler }