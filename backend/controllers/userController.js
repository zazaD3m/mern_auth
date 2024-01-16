import asyncHandler from "express-async-handler"
import generateRefreshToken from "../utils/generateRefreshToken.js"
import User from "../models/userModel.js"
import generateGoogleToken from "../utils/generateGoogleToken.js"
import { loginSchema, registerSchema } from "../services/validators.js"
import generateAccessToken from "../utils/generateAccessToken.js"
import jwt from "jsonwebtoken"
import { clearRefreshToken, returnUserInfo } from "../utils/helpers.js"
import { CustomError } from "../utils/CustomError.js"

// GOOGLE AUTH START

// @desc    Create or get user from DB with email
// @desc    Generate google token using googleID
// @desc    Redirect to client google auth route
// route    GET /api/users/google/redirect
// @access  Public // don't need to be logged in to access
const googleLoginCallback = asyncHandler(async (req, res) => {
  // when user authenticates using google callback in GoogleStrategy will hit this route
  // data that will be in googleStrategy done(err, data to pass to redirect route) will
  // be here on req.user property
  const { id } = req.user

  generateGoogleToken(res, id)

  return res.redirect(process.env.CLIENT_URL + "/google/getuser")
})

// @desc    Auth user/set token
// route    GET /api/users/auth/google/getuser
// @access  Public // don't need to be logged in to access
const googleGetUser = asyncHandler(async (req, res) => {
  // Gets user data from checkGoogleAuth middleware
  const { name, email, _id } = req.user

  if (!name || !email || !_id) {
    throw new CustomError("Internal server error", 500)
  }

  generateRefreshToken(res, _id)
  const accessToken = generateAccessToken(_id)

  return res.status(201).json({ accessToken, userInfo: req.user })
})
// GOOGLE AUTH END

// @desc    Auth user/set token
// route    POST /api/users/auth
// @access  Public // don't need to be logged in to access
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const { error } = loginSchema.validate({ email, password })

  if (error) {
    throw new CustomError("Invalid email or password", 400)
  }

  const foundUser = await User.findOne({ email }).exec()

  if (foundUser && (await foundUser.matchPassword(password))) {
    generateRefreshToken(res, foundUser._id)
    const accessToken = generateAccessToken(foundUser._id)
    return returnUserInfo(foundUser.toObject(), res, 201, accessToken)
  } else {
    throw new CustomError("Invalidddd", 401)
  }
})

const refresh = asyncHandler(async (req, res) => {
  const cookies = req.cookies
  if (!cookies?.jwt) {
    res.status(401)
    clearRefreshToken(res)
    throw new Error("refreshToken has expired")
  }

  let userIdFromRefreshToken

  const refreshToken = cookies.jwt
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    function (err, decoded) {
      if (err || !decoded?.userId) {
        res.status(401)
        clearRefreshToken(res)
        throw new Error("refreshToken has expired")
      } else {
        userIdFromRefreshToken = decoded.userId
      }
    }
  )

  const tempUser = await User.findById(userIdFromRefreshToken)
    .select("_id")
    .exec()

  if (!tempUser) {
    res.status(404)
    clearRefreshToken(res)
    throw new Error("User Not Found")
  }

  const accessToken = generateAccessToken(tempUser._id)

  return res.status(201).json({ accessToken })
})

// @desc
// route
const me = asyncHandler(async (req, res) => {
  const me = req.user
  return res.status(200).json({ userInfo: me })
})

// @desc    Register a new user
// route    POST /api/users
// @access  Public // don't need to be logged in to access
const registerUser = asyncHandler(async (req, res) => {
  console.log(process.env.NODE_ENV)
  const { name, email, password } = req.body

  const { error } = registerSchema.validate({ name, email, password })

  if (error) {
    throw new CustomError("Invalid email or password", 400)
  }

  const userExists = await User.findOne({ email }).exec()

  if (userExists) {
    throw new CustomError("User already exists", 400)
  }

  const newUser = await User.create({
    name,
    email,
    password,
  })

  if (!newUser) {
    throw new CustomError("Internal server error", 500)
  }

  const { _id } = newUser

  generateRefreshToken(res, _id)
  const accessToken = generateAccessToken(_id)

  return res.status(201).json({ accessToken, userInfo: { _id, name, email } })
})

// @desc    Logout user
// route    POST /api/users/logout
// @access  Public // don't need to be logged in to access
const logoutUser = asyncHandler(async (req, res) => {
  const cookies = req.cookies

  if (!cookies?.jwt) {
    return res.status(200).json({ message: "User logged out" })
  }

  clearRefreshToken(res)

  return res.status(200).json({ message: "User logged out" })
})

// @desc    Get user profile
// route    GET /api/users/profile
// @access  Private // You have to have an access token to access
const getUserProfile = asyncHandler(async (req, res) => {
  const user = {
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  }

  res.status(200).json(user)
})

// @desc    Update user profile
// route    PUT /api/users/profile
// @access  Private // You have to have an access token to access
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    // check if user changed email and if so is it available or not
    if (req.body.email) {
      if (req.body.email !== user.email) {
        const emailAlreadyExists = await User.findOne({ email: req.body.email })
        if (emailAlreadyExists) {
          res.status(400)
          throw new Error("Email is already taken")
        }
      }
    }

    user.name = req.body.name || user.name
    user.email = req.body.email || user.email

    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()
    return res.status(201).json({ userInfo: updatedUser })
  } else {
    res.status(404)
    throw new Error("User not found")
  }
})

// @desc
// route
export const getUser = asyncHandler(async (req, res) => {
  const { id } = req.params
  const user = await User.findById(id)

  if (!user) {
    throw new CustomError("User not found", 404)
  }

  return res.status(200).json(user)
})

export {
  loginUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  googleLoginCallback,
  googleGetUser,
  refresh,
  me,
}
