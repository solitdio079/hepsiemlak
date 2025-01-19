import { ExtractJwt, Strategy } from 'passport-jwt'
import passport from 'passport'
import Users from '../models/users.mjs'
import dotenv from 'dotenv'
dotenv.config()

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
}

passport.use(
  new Strategy(opts, async (payload, done) => {
    try {
      const user = await Users.findById(payload.id)
      if (user) return done(null, {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        notifUrl: user.notifUrl.endpoint,
        phone: user.phone || null,
        isAdmin: user.isAdmin || false,
        isVerified: user.isVerified || false,
        userType: user.userType || 'visitor',
      })
    } catch (error) {
      return done(error)
    }
  })
)
