import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import User from "../models/userModel.js"

export default function () {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        scope: ["email", "profile"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const email = profile.emails[0].value
        let user
        try {
          user = await User.findOne({ email })
          if (!user) {
            user = await User.create({
              name: profile.name.givenName,
              email: email,
            })
          }
          return done(null, { id: user._id })
        } catch (err) {
          console.log(err)
          return done(err, null)
        }
      }
    )
  )
}

// The done function is part of the Passport.js callback and is used to indicate the completion of the authentication process. The first argument (null in this case) is reserved for an error, and the second argument (token) is what will be attached to req.user.
