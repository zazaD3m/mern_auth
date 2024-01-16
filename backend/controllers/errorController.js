import { CustomError } from "../utils/CustomError.js"

const devErrors = (res, error) => {
  res.status(error.statusCode).json({
    status: error.statusCode,
    message: error.message,
    stackTrace: error.stack,
    error: error,
  })
}

const castErrorHandler = (err) => {
  const msg = `Invalid value for ${err.path}: ${err.value}!`
  return new CustomError(msg, 400)
}

const duplicateKeyErrorHandler = (err) => {
  const email = err.keyValue.email
  const msg = `There is already a user with email ${email}. Please use another email!`

  return new CustomError(msg, 400)
}

const prodErrors = (res, error) => {
  // Only errors created with our CustomError will have isOperational to true
  // So we will only send to client our handled errors
  if (error.isOperational) {
    res.status(error.statusCode).json({
      status: error.statusCode,
      message: error.message,
    })
  } else {
    res.status(500).json({
      status: "error",
      message: "Something went wrong! Please try again later.",
    })
  }
}

const globalErrorHandler = (error, req, res, next) => {
  error.statusCode = error.statusCode || 500
  error.status = error.status || "error"

  if (process.env.NODE_ENV === "development") {
    devErrors(res, error)
  } else if (process.env.NODE_ENV === "production") {
    if (error.name === "CastError") {
      error = castErrorHandler(error)
    }
    if (error.code === 11000) {
      error = duplicateKeyErrorHandler(error)
    }
    prodErrors(res, error)
  }
}

export default globalErrorHandler
