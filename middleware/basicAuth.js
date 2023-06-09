const authPage = permission => {
  return (req, res, next) => {
    const { role } = req.body;
    if (!role) {
      return res.status(403).json('You need sign in!')
    }
    if (!permission.includes(role)) {
      return res.status(403).json('You dont have permission!!')
    }

    next();
  }
}

module.exports = {
  authPage
}