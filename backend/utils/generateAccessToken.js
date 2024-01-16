import jwt from "jsonwebtoken"

const generateAccessToken = (userId) => {
  const accessToken = jwt.sign({ userId }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "15m",
  })
  return accessToken
}

export default generateAccessToken
