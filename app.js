// Dependencies
import { PrismaClient } from '@prisma/client/extension';
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import 'dotenv/config'
import express from 'express';
import passport from 'passport';
import { Strategy } from 'passport-local';
import path from 'path'
import { fileURLToPath } from 'url';
// Route Imports

// App setup
const app = express();
const _dirname = path.dirname(fileURLToPath(import.meta.url));
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(_dirname, 'public'), {
  // Production prop
  //maxAge: '1d'
}));
app.set('views', path.join(_dirname, 'src/views'));
app.set('view engine', 'pug');

// Session setup
const prismaStore = new PrismaSessionStore(
  new PrismaClient(),
  {
    checkPeriod: 2 * 60 * 1000,  //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }
);

app.use(
  expressSession({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: prismaStore,
  })
);
// Passport setup

async function verify(username, password, done) { }

const localStrategy = new Strategy(verify);

passport.use(localStrategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});
passport.deserializeUser(async (userId, done) => {
  try {
    const user = // await getUserById(userId);
      done(null, user);
  } catch (err) {
    done(err);
  }
})

app.use(passport.session());

// General middleware

// Error catching middleware
app.use((err, req, res, next) => {
  const status = err.status || 500;

  console.error(err);

  return res.status(status).json({
    error: {
      message: err.expose ? err.message : 'Internal Server Error',
    },
  });
});


// Server start
const server = app.listen(process.env.PORT, () => {
  console.log('Server listening on port', process.env.PORT);
});

server.on('error', (err) => {
  console.error('Server failed to start:', err);
  process.exit(1);
});

