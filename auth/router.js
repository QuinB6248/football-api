const { Router } = require('express')
const { toJWT } = require('./jwt')
const User = require('../User/model')
const bcrypt = require('bcrypt');
const auth = require('./middleware')
const router = new Router()

router.post('/logins', (req, res, next)=> {
  const password = req.body.password
  const email = req.body.email
  if (!email|| !password) {
    res.status(400).send({
      message: 'Please supply a valid email and password'
    })
  }else {
    User
      .findOne({ //sequelize method
          where: { 
          email: req.body.email
          }
      })
      .then(entity => {
        if (!entity) {
          res.status(400).send({
          message: 'USER OR PASSWORD IS INCORRECT'
          })
        }
        //compare given password with password in database
        if (bcrypt.compareSync(req.body.password, entity.password)) {
       
          res.send({
            jwt: toJWT({ userId: entity.id }) //toJWT returns a key for this user
          })
      }else {
        res.status(400).send({
          message: 'Password was incorrect'
        })
      }

      })
      .catch(err => {
        console.error(err)
        res.status(500).send({
          message: 'Something went wrong'
        })
      })
    

  }
  
})

router.get('/secret-endpoint', auth, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint ${req.user.email}.`,
  })
})
// router.get('/secret-endpoint', (req, res) => {
        //checks if token is in the header and splits it at the space, puts it in an array
//   const auth = req.headers.authorization && req.headers.authorization.split(' ')
    
//   console.log('AUTH', req.headers.authorization.split(' '))
//   if (auth && auth[0] === 'Bearer' && auth[1]) {
//     try {
//       const data = toData(auth[1])
//       res.send({
//         message: 'Thanks for visiting the secret endpoint.',
//         data
//       })
//     }
//     catch(error) {
//       res.status(400).send({
//         message: `Error ${error.name}: ${error.message}`,
//       })
//     }
//   }
//   else {
//     res.status(401).send({
//       message: 'Please supply some valid credentials'
//     })
//   }
// })
module.exports = router
