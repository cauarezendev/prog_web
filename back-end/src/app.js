'use strict'

const express     = require('express')
const bodyParser  = require('body-parser')
const mongoose    = require('mongoose')


const app = express()

// Conecta ao banco
try {
  //let options = {
  //  user: 'caua',
  //  pass: 'abc123',
  //  useNewUrlParser: true 
  //}
  //let dbUrl = 'mongodb://localhost:27017/prog_web?authSource=admin'
  let dbUrl = 'mongodb://localhost:27017/prog_web'
  mongoose.connect(dbUrl)
  mongoose.set('useCreateIndex', true)

  let db = mongoose.connection
  db.on('connected', () => {
    console.log('connected to db')

  })
  db.on('error', console.error.bind(console, 'connection error:'))
  //db.on('disconnected', () => {
  //  self.connectToDatabase()
  //})
} 
catch (error) {
  console.log(error.message)
}

// Carrega os Models
const ClassRoom  = require('./models/classroom')

// Carrega as Rotas
const index       = require('./routes/index')
const classroom   = require('./routes/classroom')

app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// body-parser serve para o retorno da requisição devolver um json
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( { extended: false }))

// Usa as rotas
app.use('/', index)
app.use('/classroom', classroom)

module.exports = app

// use admin
//db.createUser(
//  {
//  user: "caua",
//  pwd: "abc123",
//  roles: [ "userAdminAnyDatabase",
//           "dbAdminAnyDatabase",
//           "readWriteAnyDatabase"]
//  }
// )