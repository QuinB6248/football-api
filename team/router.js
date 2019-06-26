 
 const { Router } = require('express')
 const Team = require('./model')
 const router = new Router()

 router.get('/team', (req, res, next) => {
   Team.findAll()
    .then(teams => res.send(teams))
    .catch(error => next(error))
 })

 router.post('/team', (req, res, next) => {
   console.log('req.body test:', req.body)
   Team.create(req.body)
    .then(team => {
      console.log('team test:', team)
      return res.send(team)
    })
    .catch(err => next(err))
 })

 router.get('/team/:id', (req, res, next) => {
  const id = req.params.id
  Team.findByPk(id)
  .then(team => res.send(team))
  .catch(err => next(err))
 })

 router.put('/team/:id', (req, res, next) => {
  const id = req.params.id
  Team.findByPk(id)
    .then(team => {
      if(team){
        team.update(req.body)
          .then(team => res.send(team))
          .catch(err => next(err))
      } else {
        res.status(404).send({message: 'team is not in database'})
      }

    })
 })
 module.exports = router