 
 const { Router } = require('express')
 const Player = require('./model')
 const router = new Router()

 router.get('/player', (req, res, next) => {
   console.log('BODY', req.body)
   Player.findAll()
    .then(players => res.send(players))
    .catch(error => next(error))
 })


 router.post('/player', (req, res, next) => {
   console.log('req.body test:', req.body)
   Player.create(req.body)
    .then(player => {
      return res.send(player)
    })
    .catch(err => next(err))
 })

 router.get('/player/:id', (req, res, next) => {
  const id = req.params.id
  Player.findByPk(id)
  .then(player => res.send(player))
  .catch(err => next(err))
 })

 router.put('/player/:id', (req, res, next) => {
  const id = req.params.id
  Player.findByPk(id)
    .then(player => {
      if(player){
        player.update(req.body)
          .then(player => res.send(player))
          .catch(err => next(err))
      } else {
        res.status(404).send({message: 'team is not in database'})
      }

    })
 })
 module.exports = router