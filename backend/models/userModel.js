import mongoose from "mongoose"
import bcrypt from "bcryptjs"


const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
}, {
  timestamps: true
})

userSchema.pre("save", async function (next) {
  // when User.save() happens we check if password was modified or it is a new user 
  // if User was modified but password stayed the same we just go to next middleware
  // else we crypt password and save to db 
  if (!this.isModified("password")) {
    next()
  }

  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

// checks if password that user entered is matched with password saved in db
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

const User = mongoose.model("User", userSchema)

export default User