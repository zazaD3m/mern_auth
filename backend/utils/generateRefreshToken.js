import jwt from "jsonwebtoken"

const generateRefreshToken = (res, userId) => {
  const refreshToken = jwt.sign({ userId }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: "7d",
  })

  res.cookie("jwt", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  })
}

export default generateRefreshToken
