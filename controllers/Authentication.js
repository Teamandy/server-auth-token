const jwt = require('jwt-simple')
const config = require('../config')
//loading our model
const User = require('../models/user')

const tokenForUser = (user) => {
    const timestamp = new Date().getTime()
    return jwt.encode({ sub: user._id, iat: timestamp }, config.secret)
}

exports.signin = (req, res, next) => {
    // User has already had their email and password auth'd
  // We just need to give them a token
  res.send({ token: tokenForUser(req.user) });
}

exports.signup = (req, res, next) => {
    const email = req.body.email
    const password = req.body.password

    if (!email || !password) {
        res.status(422).send({ error: 'you must provide an email and a password' })
    }
    // See if a user with the given email exists
    User.findOne({ email: email }, (err, result) => {
        if (err) {
            return next(err)
        }
        result ? res.status(422).send({ error: 'user already exists' }) :
            // If a user with email does NOT exist, create and save user record
            User.create(req.body, (err, user) => {
                if (err) {
                    return next(err)
                }
                res.send({ token: tokenForUser(user) })
            })
    })
}
