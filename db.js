const Sequelize = require('sequelize')
//const sequelize = new Sequelize('postgres://postgres:secret@localhost:5432/postgres', {define: { timestamps: false }})
const databaseUrl = process.env.DATABASE_URL ||'postgres://postgres:secret@localhost:5432/postgres'
const sequelize = new Sequelize(databaseUrl)

sequelize.sync()
.then(() => console.log('Database schema has been updated'))
.catch(console.error)

module.exports = sequelize