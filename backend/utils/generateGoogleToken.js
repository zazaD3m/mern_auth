import jwt from "jsonwebtoken"

const generateGoogleToken = (res, id) => {
  const googleToken = jwt.sign({ id }, process.env.GOOGLE_TOKEN_SECRET, {
    expiresIn: "1m",
  })

  res.cookie("googleAuthToken", googleToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 60 * 1000,
  })
}

export default generateGoogleToken
