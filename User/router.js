const { Router } = require('express')
 const User = require('./model')
 const router = new Router()
 const bcrypt = require('bcrypt');
 
 router.post('/signup', (req, res, next) => {
  const user = {
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }
  
  User.create(user)
   .then(user => {
     console.log('USER:', user)
     return res.send(user)
   })
   .catch(err => next(err))
})

module.exports = router



