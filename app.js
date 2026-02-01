// Dependencies
import 'dotenv/config'
import express from 'express';
import path from 'path'
import { fileURLToPath } from 'url';
import session from 'express-session';
import { prisma } from './db/prisma.js'; // Prisma Client 
import { PrismaSessionStore } from '@quixo3/prisma-session-store';
import passport from 'passport';
import { initPassport } from './config/passport.js';
// Route Imports
import { isAuth } from './src/lib/authenticateMiddleware.js';
import dashboardRouter from './src/routes/dashboardRouter.js';
import signUpRouter from './src/routes/signUpRouter.js';
import loginRouter from './src/routes/loginRouter.js';
import logoutRouter from './src/routes/logoutRouter.js';

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
  prisma,
  {
    checkPeriod: 2 * 60 * 1000,  //ms
    dbRecordIdIsSessionId: true,
    dbRecordIdFunction: undefined,
  }
);

app.use(
  session({
    cookie: {
      maxAge: 7 * 24 * 60 * 60 * 1000 // ms
    },
    secret: process.env.SECRET,
    resave: true,
    saveUninitialized: true,
    store: prismaStore,
  })
);

initPassport();
app.use(passport.session());

// General middleware

app.use(isAuth);

// Routing

app.use(dashboardRouter);
app.use(signUpRouter);
app.use(loginRouter);
app.use(logoutRouter);
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

