export function isAuth(req, res, next) {
  const publicRoutes = ['/login', '/signup', '/public/folder'];

  if (!req.isAuthenticated() && !publicRoutes.includes(req.path)) {
    return res.redirect('/login');
  }

  next();
}




