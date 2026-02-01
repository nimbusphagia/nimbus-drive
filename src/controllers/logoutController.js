export function logoutGet(req, res) {
  req.logout(err => {
    if (err) {
      return next(err);
    }
    res.redirect("/login");
  });
}
