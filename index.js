const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()
app.use(jsonParser)

const port = process.env.PORT || 4000
const db = require('./db')
const Team = require('./team/model')
const Player = require('./player/model')
const User = require('./User/model')
const teamRouter = require('./team/router')
const playerRouter = require('./player/router')
const authRouter = require('./auth/router')
const userRouter = require('./User/router')


app.use(teamRouter)
app.use(playerRouter)
app.use(authRouter)
app.use(userRouter)

app.listen(port, function () {
  console.log(`Web server listening on port ${port}`)
})