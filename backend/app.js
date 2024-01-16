import "dotenv/config.js"
import express from "express"
import cors from "cors"
import path from "path"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/userRoutes.js"
import morgan from "morgan"
import globalErrorHandler from "./controllers/errorController.js"
import { CustomError } from "./utils/CustomError.js"
import { googleLoginStrategy } from "./services/googleStrategy.js"
import passport from "passport"

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(morgan("dev"))

passport.use(googleLoginStrategy)

app.use("/api/users", userRoutes)

if (process.env.NODE_ENV === "production") {
  const __dirname = path.resolve()
  // making dist static folder
  app.use(express.static(path.join(__dirname, "frontend/dist")))

  // any route thats not /api/users gonna load fronend index.html
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"))
  )
} else {
  app.get("/", (req, res) => res.send("Server is ready"))
}

// for pages there are no routes in API
app.all("*", (req, res, next) => {
  throw new CustomError(`Can't find ${req.originalUrl} on the server!`, 404)
})

app.use(globalErrorHandler)

export { app }
