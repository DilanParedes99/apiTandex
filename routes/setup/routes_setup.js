const controler = require('./servicios/cliente')
const jwt = require('jsonwebtoken')

module.exports.setup = (app,express) =>{
    
    var secureapp = express.Router()
    app.use('/secured', secureapp)
    secureapp.use((req,res,next) => {
        
        const bearer = req.headers['authorization']
        console.log(bearer)
        if(bearer){
            jwt.verify(bearer,process.env.JWT_SECRET, function(err,decode){
                if(err){
                    res.status(401).json({
                        msg:'Token_invalido'
                    })
                }else{
                    console.log('Token_valido')
                    next()
                }
            })
        }else{
            res.status(401).json({
                msg:'sin token'
            })
        }
    })

    app.get('/', (req,res) => res.status(200).json({msg:'Ya jala el servicio'}))
    //aqui van las rutas

    app.post('/login', controler.login)
    app.post('/upload_file',secureapp, controler.upload)
    app.get('/getProductos',secureapp,controler.getProductos)


    return app
}