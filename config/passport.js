import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import { getUserById, getUserByUsername } from "../db/queries.js";
import bcrypt from 'bcrypt';

async function verify(username, password, done) {
  try {
    const user = await getUserByUsername(username);
    if (!user) {
      return done(null, false, { message: "User not found" });
    }
    const isValid = await bcrypt.compare(password, user.password_hash);
    if (isValid) {
      return done(null, user);
    }
    return done(null, false, { message: "Wrong password" });
  } catch (err) {
    return done(err);
  }
}
export function initPassport() {
  passport.use(new LocalStrategy(verify));

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

