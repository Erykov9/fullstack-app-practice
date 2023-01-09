const authMiddleware = (req, res, next) => {
  console.log(req.session.login)
  if(req.session.login) {
    console.log('authorized', req.session.login)
    next();
  } else {
    res.status(401).send({message: 'You are not authorized!'})
    console.log('not authorized', req.session.login)
    console.log(req.session)
  }
};

module.exports = authMiddleware;