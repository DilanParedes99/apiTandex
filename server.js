const express = require('express')
const server_config = require('config')
const http = require('http')
const cors = require('cors')
  
const morgan = require('morgan')
const puerto = process.env.PORT || 8080

process.env.JWT_SECRET = (server_config.get('app.JWT_SECRET'))


var app = express()

app.use(cors())
app.use(morgan('dev'));

app.use(express.urlencoded({extended : true})) 
app.use(express.json());
app.use(express.json({limit : '100mb'}))

app.use((req,res,next)=>{
        res.header("Cache-Control", "no-cache, no-store, must-revalidate");
        res.header("Pragma", "no-cache");
        res.header("Expires", 0);

        next()
})

app = require('./routes/setup/routes_setup').setup(app,express)

http.createServer(app).listen(puerto)




