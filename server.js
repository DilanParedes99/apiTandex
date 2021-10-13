const express = require('express')
const server_config = require('config')
const http = require('http')
const cors = require('cors')
//   
const morgan = require('morgan')
const puerto = process.env.PORT || server_config.get('app.port')

process.env.JWT_SECRET = (server_config.get('app.JWT_SECRET'))


var app = express()

app.use(cors())
app.use(morgan('dev'));

app.use(express.urlencoded({extended : true})) 
app.use(express.json());
app.use(express.json({limit : '20mb'}))

app = require('./routes/setup/routes_setup').setup(app,express)

http.createServer(app).listen(puerto)




