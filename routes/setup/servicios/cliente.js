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
    console.log(email,password, req.body)

    //SELECT * FROM heroku_1a378f873641606.usuarios where correo='admin2@gmail.com'
     dbconn.query('SELECT * FROM heroku_1a378f873641606.usuarios where correo= ?',[email]) 
    .then(rows=>{
        console.log('',rows)
        const encriptada = rows[0].password
        if(rows.length == 1){
            console.log(rows[0].password)
             bcrypt.compare(password, encriptada, function(err, result) {
                    if(result ==true){
                        console.log(rows[0].password)
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







    //actualizado   ---YA IMPLEMENTADO EN EL FRONT----
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








    // Agregar usuarios *actualizado*     ------NO IMPLEMENTADO-----
function uploadUser(req, res) {
    const{nombre,apellidoPaterno,apellidoMaterno,telefono,email,password,nivelCuenta}= req.body
    //console.log(nombre,apellidoPaterno,apellidoMaterno,telefono,email,password,"hash",nivelCuenta)

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
    //Mostrar usuarios *actualizado*       -----NO IMPLEMENTADO-----
function showUsers(req, res){
    dbconn.query('SELECT * FROM heroku_1a378f873641606.usuarios;')
    .then(rows=>{
        res.status(200).json({
            status:200,
            usuarios:rows
        })
    })
}

function uploadProducts(req, res){
    const productos = req.body.seleccionados.selectionModel
    const datos = req.body
    if( productos === undefined){
        res.status(401).json({error:'Productos no seleccionados',
        message:'Reintente seleccionar archivos'    })
    }else{
        for(let i =0;i<productos.length; i++){
            dbconn.query('SELECT `id`, `Clave`, `Descripcion`, `Existencias`, `Línea`, `Unidad_de_entrada`, `Moneda`, `Fecha_ultima_compra`, `Ultimo_costo`, `Nombre_de_imagen`, `ID_SAE`, `Clave_unidad`, `Clave_alterna`, `Campo_libre` FROM `productos` WHERE id=?',[productos[i]])
            .then(rows=>{
                /* console.log(rows[0])
                console.log("descricpion: ",rows[0].Descripcion) */

                const data = {
                    name: rows[0].Descripcion,
                    type: "simple",
                    description: datos.description,
                    short_description: "<p>CARACTERÍSTICAS</p>\n<ul>\n<li>"+datos.short_description+"</li>\n</ul>\n",
                    regular_price: datos.regular_price,
                    categories: [
                      {
                          "id": 243,
                          "name": datos.category,
                          "slug": datos.category
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
             
                WooCommerce.post("products", data)
               .then(response => {
                // Successful request
                res.status(200).json({msg:'Todo bien',status:response.status})
                
              }).catch(error => {
                res.status(400).json({msg:eror})
              }) 
              
            }).catch(err=>{
                console.log(err);
                res.status(500).json({msg : 'ocurrió un error'})
            })
        }

    }
}

function updateProducts(req,res) {
    const datos = req.body
    dbconn.query('UPDATE `productos` SET `Clave`=?,`Descripcion`=?,`Existencias`=?,`Unidad_de_entrada`=?,`Ultimo_costo`=?,`Campo_libre`=? WHERE id=?',[datos.clave,datos.descripcion,datos.existencias,datos.unidad_de_entrada,datos.ultimoCosto,datos.campoLibre,datos.id])
    .then(rows=>{
        res.status(200).json({msg:'Actualizado con exito'})
        console.log(rows)
    }).catch(err=>{
        console.log(err)
    })
}

function updateUser(req,res) {
    const datos = req.body
    console.log(datos.nivelCuenta,datos.correo,datos.contrasena,datos.contrasena2,datos.nombre,datos.apellidoPaterno,datos.apellidoMaterno,datos.telefono,datos.apellidoPaterno,datos.id)
    dbconn.query('UPDATE `cuenta` SET  `nivelCuenta`=?,`Correo`=?,`Contrasena`=?,`nombre`=?,`Apellido_paterno`=?,`Apellido_materno`=?,`telefono`=? WHERE id=?',[datos.nivelCuenta,datos.correo,datos.contrasena,datos.nombre,datos.apellidoPaterno,datos.apellidoMaterno,datos.telefono,datos.id])
    .then(rows=>{
        res.status(200).json({
            msg:'Usuario actualizado con exito'})
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
    updateUser
}