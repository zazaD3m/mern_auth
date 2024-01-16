import connectDB from "./config/db.js"
import { app } from "./app.js"

const PORT = process.env.PORT || 5000

connectDB()

process.on("uncaughtException", (err) => {
  console.log(err.name, err.message)
  console.log("Uncaught Exception occured! Shutting down...")
  process.exit(1)
})

// googleAuthStrategy()

const server = app.listen(PORT, () =>
  console.log(`Server started on port ${PORT}`)
)

process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message)
  console.log("Unhandled rejection occured! Shutting down...")
  server.close(() => {
    process.exit(1)
  })
})
