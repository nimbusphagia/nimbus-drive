import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"

export function initPassport({ getUserById }) {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      // verify logic
    })
  )

  passport.serializeUser((user, done) => {
    done(null, user.id)
  })

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await getUserById(id)
      done(null, user)
    } catch (err) {
      done(err)
    }
  })

  return passport
}

