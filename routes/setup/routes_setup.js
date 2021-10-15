const controler = require('./servicios/cliente')
const jwt = require('jsonwebtoken')

module.exports.setup = (app,express) =>{
    
    var secureapp = express.Router()
    app.use('/secured', secureapp)
    secureapp.use((req,res,next) => {
        
        const bearer = req.headers['authorization']
        if(bearer){
            jwt.verify(bearer,process.env.JWT_SECRET, function(err,decode){
                if(err){
                    res.status(401).json({
                        msg:'Token_invalido'
                    })
                }else{
                    next()
                }
            })
        }else{
            res.status(401).json({
                msg:'Sin autorización'
            })
        }
    })

    //home prueba de servidor
    app.get('/', (req,res) => res.status(200).json({msg:'Api de TANDEX online'}))
    
    //POST
    app.post('/login', controler.login)
    app.post('/upload_file',secureapp, controler.uploadFile)
    app.post('/upload_user',secureapp, controler.uploadUser)
    app.post('/update_products',secureapp, controler.updateProducts)
    app.post('/update_user',secureapp, controler.updateUser)
    
    //GET
    app.get('/getProductos',secureapp,controler.getProductos)
    app.get('/getUsers',secureapp,controler.showUsers)
    
    //API woocomerce
    app.post('/post_products',secureapp, controler.uploadProducts)

    return app
}