export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.redirect('/login');
  }
}
export function apiIsAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.status(403).send();
  }
}
