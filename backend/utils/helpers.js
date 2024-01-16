export const clearRefreshToken = (res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
  })
}
export const returnUserInfo = (user, res, statusCode, accessToken) => {
  const returnObject = { userInfo: {} }

  if (accessToken) {
    returnObject.accessToken = accessToken
  }

  const userKeysToReturn = ["name", "email"]

  userKeysToReturn.forEach((key) => {
    if (user.hasOwnProperty(key)) {
      returnObject.userInfo[key] = user[key]
    }
  })

  return res.status(statusCode).json(returnObject)
}
export const throwErr = (res, status, message) => {
  res.statusCode = status
  throw new Error(message)
}
