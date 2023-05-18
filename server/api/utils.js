
function requireUser(req, res, next) {
    if (!req.user) {
      res.status(401)
      next({
        message: "User or guest is not authorized for this function",
        error: "UnAuthError",
        name: "blah"
      });
    } 
    next();
}



module.exports = {
    requireUser
}