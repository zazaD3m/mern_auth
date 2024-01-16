import jwt from "jsonwebtoken"
import asyncHandler from "express-async-handler"
import User from "../models/userModel.js"
import { CustomError } from "../utils/CustomError.js"

export const checkGoogleAuth = asyncHandler(async (req, res, next) => {
  let token

  token = req.cookies.googleAuthToken

  if (!token) {
    throw new CustomError("Unauthorized", 401)
  }

  const decoded = jwt.verify(token, process.env.GOOGLE_TOKEN_SECRET)

  if (!decoded?.id) {
    throw new CustomError("Unauthorized", 401)
  }

  const { id } = decoded

  const user = await User.findById(id).select("-password")

  if (!user) {
    throw new CustomError("Internal server error", 500)
  }

  req.user = user
  res.clearCookie("googleAuthToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  })

  next()
})

export const authenticateUser = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization

  if (!authHeader?.startsWith("Bearer ")) {
    throw new CustomError("Unauthorized", 401)
  }

  const accessToken = authHeader.split(" ")[1]

  if (!accessToken) {
    throw new CustomError("Unauthorized", 401)
  }

  let decoded

  jwt.verify(
    accessToken,
    process.env.ACCESS_TOKEN_SECRET,
    function (err, decodedId) {
      if (err) {
        if (err.name === "TokenExpiredError") {
          throw new CustomError("accessToken expired", 401)
        } else {
          throw new CustomError("Unauthorized", 401)
        }
      } else {
        decoded = decodedId
      }
    }
  )

  const { userId } = decoded

  console.log(userId)

  const user = await User.findById(userId)
    .select(["name", "email", "_id"])
    .exec()

  if (!user) {
    return res.status(404).json({ message: "User not found, try again." })
  }
  req.user = user
  next()
})
