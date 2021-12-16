const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')

//encriptacion de password
const bcrypt = require('bcrypt');


//WooCommerceRestApi
const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;

//configuracion de la API de woocomerce
const WooCommerce = new WooCommerceRestApi({
    url: 'https://hometoys.com.mx/pruebas2021/', // Your store URL
    consumerKey: 'ck_fc785525dec737adb8050dcd4a72d0b162066630', // Your consumer key
    consumerSecret: 'cs_bf9e30331b1d3031dbd90e82670839b060804b3e', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
  });

//subir productos desde excel ,headersactualizado       ----YA IMPLEMENTADO EN EL FRONT-----
function uploadFile (req, res) {
    const archivo = req.body
    if(archivo.length==0 || archivo == null){
        res.status(400).json({error:'Archivo invalido',
        message:'Revise formato de archivo'    })
        console.log("archivo invalido")
    }else{
       /*  console.log(archivo[0]) */


        for(let indice = 0;indice<archivo.length;indice++){
            dbconn.query('call verificar_clave_primary_producto(?)',[archivo[indice]['Clave ']])
            .then(rows=>{
                console.log(rows)
                res.status(400).json({message:'clave duplicada, no se puede insertar'})
            }).catch(err=>{
                console.log(err)
                 dbconn.query('call update_productos(?,?,?,?,?,?,?)',
                    [archivo[indice]['Clave '],archivo[indice]['Linea '],archivo[indice]['Descripción '],archivo[indice]['Último costo '],'',archivo[indice]['Existencias '],archivo[indice]['Unidad de entrada ']])
                    .then(rows=>{
                        res.status(200).json({msg : 'Producto subidos con exito',data : rows})
                    }).catch(err=>{
                        console.log(err);
                        res.status(500).json({msg : 'ocurrió un error',error : err}) 
                    }) 
            })
        }  
        } 
        
    }

    //login *actualizado*                       ---YA IMPLEMENTADO EN EL FRONT----
function login (req, res) {
    const {email, password} = req.body
    /* console.log(email,password, req.body) */

    //SELECT * FROM heroku_1a378f873641606.usuarios where correo='admin2@gmail.com'
     dbconn.query('SELECT * FROM heroku_1a378f873641606.usuarios where correo= ?',[email]) 
    .then(rows=>{
        /* console.log('',rows) */
        const encriptada = rows[0].password
        if(rows.length == 1){
            /* console.log(rows[0].password) */
             bcrypt.compare(password, encriptada, function(err, result) {
                    if(result ==true){
                        /* console.log(rows[0].password) */
                        const accessToken = jwt.sign({ userId: rows[0].correo , nombre : rows[0].password} , process.env.JWT_SECRET, {
                            expiresIn: "1h"
                        });
                        res.status(200).json({
                            msg:'Autenticación correcta',
                            token : accessToken
                        }) 
    
                    }else{
                        res.status(401).json({
                            msg:'No existe usuario',
                        })
                        
                    }
                }); 
        }else{
            res.status(401).json({msg:'Autenticación incorrecta'})
        }
    }).catch(err=>{
        console.log(err)
        res.status(401).json({msg:'Autenticación incorrecta'})
    })
}
                                                                        //Consultas de productos

    //actualizado                   ---IMPLEMENTADO----
function getProductos(req, res) {
   
    dbconn.query('Select * from `heroku_1a378f873641606`.`productossae`')
    .then(rows=>{
            res.status(200).json({
                status:200,
                productos:rows
            })
    }).catch(err=>{
        res.status(401).json({
            msg:err
        })
    })   
}

//subir a woocomerce   ----- NO IMPLEMENTADO-----
function uploadProducts(req, res){
    const datos = req.body
    const user = req.headers.user
    
    console.log(user) 
    console.log(datos) 
    //validacion si algun campo es NULL, '' o UNDEFINED

    /* datos.forEach(function(item){
        let i = Object.keys(item).length
        console.log(i)
        for(var j in item){
            //console.log(item[j])
            if(item[j]===null || item[j]===undefined || item[j]===''){
                console.log("incompleto")
                res.status(400).json({msg:"Alguno de los prtoductos no cuenta con los datos requeridos sufucientes."})
                break
            }
        }
    }) */


    if(datos.length === 0){
        res.status(401).json({error:'Productos no seleccionados',
        message:'Reintente seleccionar archivos'    })
    }
    else{
        for(let i =0;i<datos.length; i++){
            const data = {
                    name: datos[i].descripcionP,
                    type: datos[i].typeWOO,
                    description: datos[i].descriptionWoo,
                    short_description: "<p>CARACTERÍSTICAS</p>\n<ul>\n<li>"+datos[i].shortDescriptionWOO+"</li>\n</ul>\n",
                    regular_price: datos[i].precio.toString(),
                    categories: [
                        {
                            "id": 123,
                            "name": datos[i].categoryWOO,
                            "slug": "desconocido"
                        }
                    ],
                    images: [
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_front.jpg"
                        },
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_4_back.jpg"
                        },
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_3_front.jpg"
                        },
                        {
                            src: "http://demo.woothemes.com/woocommerce/wp-content/uploads/sites/56/2013/06/T_3_back.jpg"
                        }
                    ],
                    
                };
            
                //peticion para subir a WOO
                WooCommerce.post("products", data)
                .then(response => {
                    // Successful request
                    //res.status(200).json({msg:'Todo bien',status:response.status})
                    //console.log(response.data.id)
                    controlProducto(user,datos[i].claveProducto)
                }).catch(error => {
                    res.status(400).json({msg:error})
                })  
            } 
            bitacora()
            res.status(200).json({'msg':'Productos subidos correctamente'})
        }  
        
    }
    
    function bitacora(){
        console.log("entra a bitacora")
        let now= new Date();
        console.log('La fecha actual es',now);
    }

    function controlProducto(user,datos){
        dbconn.query('SELECT * FROM heroku_1a378f873641606.usuarios where correo=?',[user])
        .then(rows=>{
            dbconn.query('INSERT INTO `heroku_1a378f873641606`.`productos_publicados`(`claveProductoP`,`woocomerce`,`idUsuarioPP`)VALUES(?,?,?)',[datos,"WOO",rows[0].id])
        })
    }

//actualizar datos de un producto  -----IMPLEMENTADO-----
function updateProducts(req,res) {
    const datos = req.body
    console.log(datos)
    dbconn.query('UPDATE `heroku_1a378f873641606`.`productossae` SET `linea` = ?,`descripcionP` = ?,`precio` = ?,`existencias` = ?,`unidadEntrada` = ?,`typeWOO` = ?,`shortDescriptionWOO` = ?,`descriptionWoo` = ?,`categoryWOO` = ? WHERE `claveProducto` = ?',
    [datos.linea,datos.descripcion,datos.precio,datos.existencias,datos.unidad,datos.typeWoo,datos.shortDescriptionWOO,datos.descriptionWOO,datos.categoryWOO,datos.clave])
    .then(rows=>{
        res.status(200).json({msg:'Actualizado con exito'})
        console.log(rows)
    }).catch(err=>{
        console.log(err)
    })  
}

function deleteProducto(req,res){
    const datos = req.body
    /* console.log("los datos son: ",datos) */

    dbconn.query('DELETE FROM `heroku_1a378f873641606`.`productossae` WHERE claveProducto = ?',[datos.claveProducto])
    .then(rows=>{
        res.status(200).json({
            msg:'Usuario eliminado'})
            console.log(rows)
        }).catch(err=>{
            console.log(err)
        }) 

}

function addProducto(req,res){
    const data = req.body
    console.log(data)
    /* res.status(200).json({msg:'Hecho'}) */
    if(data.clave==''){
        res.status(400).json({msg:'ERROR: Revise los campos.'})
    }else{
        dbconn.query('SELECT claveProducto FROM heroku_1a378f873641606.productossae where claveProducto=?',[data.clave],)
        .then(rows=>{
            /* console.log(rows[0].claveProducto) */
            if(rows[0].claveProducto == data.clave){
                res.status(400).json({msg:'ERROR: La clave de producto ya esta registrada.'})
                console.log("iguales")
            }
            
        }).catch(err=>{
            dbconn.query('INSERT INTO `heroku_1a378f873641606`.`productossae`(`claveProducto`,`linea`,`descripcionP`,`precio`,`existencias`,`unidadEntrada`,`typeWOO`,`shortDescriptionWOO`,`descriptionWoo`,`categoryWOO`)VALUES(?,?,?,?,?,?,?,?,?,?)',
            [data.clave,data.linea,data.descripcion,data.precio,data.existencias,data.unidad,data.typeWoo,data.shortDescription,data.descriptionWOO,data.categoryWOO])
            .then(rows=>{
                res.status(200).json({msg:'Producto añadido correctamente'})
                console.log(rows)
            }).catch(err=>{
                console.log(err)
                res.status(400).json({msg:'ERROR: Algo fue mal, intentelo mas tarde'})
            })
            /* console.log(err) */
        })
    }


    
    
}

function getProductosPublicados(req, res) {
    dbconn.query('select P.id, P.claveProductoP, S.descripcionP , P.woocomerce  from  `heroku_1a378f873641606`.`productos_publicados` as P inner join `heroku_1a378f873641606`.`productossae` as S on P.claveProductoP = S.claveProducto')
    .then(rows=>{
        console.log(rows)
        res.status(200).json({
            status:200,
            datos:rows
        })
    })
}
                                                                       //CONSULTAS DE USUARIOS!!
// Agregar usuarios *actualizado*     ------IMPLEMENTADO-----
function uploadUser(req, res) {
const{nombre,apellidoPaterno,email,password,nivelCuenta}= req.body
console.log(nombre,apellidoPaterno,email,password,"hash",nivelCuenta)

dbconn.query(`call valida_correo_repetido(?)`,[email])
.then(rows=>{
    const datos = rows[0];

    const correoV = JSON.stringify(datos[0].correo);
    const correoV2 = JSON.stringify(email);
    
    if(correoV2 == correoV){
        res.status(400).json({message:'El usuario ya existe'})
    }
    
}).catch(err=>{
    /* res.status(200).json({message:'El correo no existe en la base de datos'}) */
    console.log(err)
    bcrypt.hash(password,10,function(err,data){ 
      if(data){
          dbconn.query('INSERT INTO `heroku_1a378f873641606`.`usuarios` (`tipoUsuario`,`correo`,`password`,`nombre`,`apellido`)VALUES(?,?,?,?,?)',[nivelCuenta,email,data,nombre,apellidoPaterno])
          .then(rows=>{
              res.status(200).json({msg:'Usuario creado'})
          }).catch(err=>{
              console.log(err);
              res.status(500).json({msg : 'ocurrió un error'})
          })
      }
  })  
})

}
//Mostrar usuarios *actualizado*       -----IMPLEMENTADO-----
function showUsers(req, res){
dbconn.query('SELECT * FROM heroku_1a378f873641606.usuarios;')
.then(rows=>{
    console.log(rows)
    res.status(200).json({
        status:200,
        usuarios:rows
    })
})
}

//actualizar usuario -----IMPLEMENTADO-----
function updateUser(req,res) {
    const datos = req.body
    console.log(datos.tipoUsuario,datos.correo,datos.nombre,datos.apellido,datos.id)
    /* UPDATE `heroku_1a378f873641606`.`usuarios` SET `id` = ?,`tipoUsuario` = ?,`correo` = ?,`password` = ?,`nombre` = ?,`apellido` = ? WHERE `id` = ? */
    
    dbconn.query('UPDATE `heroku_1a378f873641606`.`usuarios` SET `tipoUsuario` = ?,`correo` = ?,`nombre` = ?,`apellido` = ? WHERE `id` = ?',
    [datos.tipoUsuario,datos.correo,datos.nombre,datos.apellido,datos.id])
    .then(rows=>{
        res.status(200).json({
            msg:'Usuario actualizado con exito'})
            console.log(rows)
        }).catch(err=>{
            console.log(err)
        }) 
}

//borrar usuario -----IMPLEMENTADO-----
function deleteUser(req,res){
    const datos = req.body
    /* console.log("los datos son",req.body) */

    dbconn.query('DELETE FROM `heroku_1a378f873641606`.`usuarios` WHERE id=?',[datos.id])
    .then(rows=>{
        res.status(200).json({
            msg:'Usuario eliminado'})
            console.log(rows)
        }).catch(err=>{
            console.log(err)
        }) 

}
    
    module.exports= {
        login,
        uploadFile,
        getProductos,
        uploadUser,
        showUsers,
        uploadProducts,
        updateProducts,
        updateUser,
        deleteUser,
        deleteProducto,
        addProducto,
        getProductosPublicados
}