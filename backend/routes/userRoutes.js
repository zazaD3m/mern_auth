import express from "express"
import passport from "passport"
import {
  loginUser,
  registerUser,
  logoutUser,
  updateUserProfile,
  googleGetUser,
  googleLoginCallback,
  refresh,
  me,
} from "../controllers/userController.js"
import {
  authenticateUser,
  checkGoogleAuth,
} from "../middleware/authMiddleware.js"

const router = express.Router()

// /api/users
router.post("/", registerUser)

router.post("/auth", loginUser)

router.post("/logout", logoutUser)

router.put("/", authenticateUser, updateUserProfile)

router.get("/refresh", refresh)

router.get("/me", authenticateUser, me)

// GOOGLE AUTH
router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    failureRedirect: process.env.CLIENT_URL_DEV,
  })
)

router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    session: false,
    failureRedirect: process.env.CLIENT_URL_DEV,
  }),
  googleLoginCallback
)

router.get("/auth/google/getuser", checkGoogleAuth, googleGetUser)

// GOOGLE AUTH END

export default router
