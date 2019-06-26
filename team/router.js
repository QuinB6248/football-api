 const { Router } = require('express')
 const Team = require('./model')
 const router = new Router()

 router.get('/team', (req, res, next) => {
   Team.findAll()
    .then(teamMembers => res.send({teamMembers}))
    .catch(next)
 })

 module.exports = router