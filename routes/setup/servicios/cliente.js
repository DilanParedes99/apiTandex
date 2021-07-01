const dbconn = require('../dbconn/dbconn')()
const jwt = require('jsonwebtoken')
//WooCommerceRestApi
var WooCommerceAPI = require('woocommerce-api');
//configuracion de la API de woocomerce
const WooCommerce = new WooCommerceAPI({
    url: 'https://hometoys.com.mx/pruebas2021/', // Your store URL
    consumerKey: 'ck_fc785525dec737adb8050dcd4a72d0b162066630', // Your consumer key
    consumerSecret: 'cs_bf9e30331b1d3031dbd90e82670839b060804b3e', // Your consumer secret
    version: 'wc/v3' // WooCommerce WP REST API version
  });


function uploadFile (req, res) {
    const archivo = req.body
    if(archivo.length==0 || archivo == null){
        res.status(400).json({error:'Archivo invalido',
        message:'Revise formato de archivo'    })
        console.log("archivo invalido")
    }else{

           for(let indice = 0;indice<archivo.length;indice++){
                dbconn.query('INSERT INTO `productos`(`Clave`, `Descripción`, `Existencias`, `Línea`, `Unidad_de_entrada`, `Moneda`, `Fecha_ultima_compra`, `Ultimo_costo`, `Nombre_de_imagen`, `ID_SAE`, `Clave_unidad`, `Clave_alterna`, `Campo_libre`) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)',
                [archivo[0]['Clave '],archivo[indice]['Descripción '],archivo[indice]['Existencias '],archivo[indice]['Línea '],archivo[indice]['Unidad de entrada '],archivo[indice]['Moneda '],archivo[indice]['Fecha de última compra '],'',archivo[indice]['Nombre de la imagen '],archivo[indice]['ID para sincronización con SAE '],archivo[indice]['Clave unidad '],archivo[indice]['Clave alterna '],archivo[indice]['Campo libre 8  ']])
                .then(rows=>{
                    res.status(200).json({msg : 'Productos subidos con exito',data : rows})
                }).catch(err=>{
                    console.log(err);
                    res.status(500).json({msg : 'ocurrió un error'})
                })
           }
        } 
        
    }

function login (req, res) {
    const {email, pass} = req.body
    dbconn.query('SELECT * FROM `cuenta` WHERE correo= ? and contrasena= ?',[email,pass])
    .then(rows=>{
        if(rows.length == 1){
            const accessToken = jwt.sign({ userId: rows[0].email , nombre : rows[0].password} , process.env.JWT_SECRET, {
                expiresIn: "1h"
            });
            res.status(200).json({
                msg:'Autenticación correcta',
                token : accessToken
            }) 
        }else{
            res.status(401).json({msg:'Autenticación incorrecta'})
        }
    }).catch(err=>{
        console.log(err)
    })
}

function getProductos(req, res) {
    
    dbconn.query('SELECT * FROM `productos` WHERE 1')
    .then(rows=>{
            res.status(200).json({
                status:200,
                productos:rows
            })
    }).catch(err=>{
        res.status(400).json({
            msg:err
        })
    })
}

function uploadUser(req, res) {
    const{nombre,apellidoPaterno,apellidoMaterno,telefono,email,password}= req.body
    dbconn.query('INSERT INTO `cuenta`(`idUsuario`, `nivelCuenta`, `Correo`, `Contrasena`, `nombre`, `Apellido_paterno`, `Apellido_materno`, `telefono`) VALUES (?,?,?,?,?,?,?,?)',['1','Admnistrador',email,password,nombre,apellidoPaterno,apellidoMaterno,telefono])
    .then(rows=>{
        res.status(200).json({msg:'Usuario creado'})
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg : 'ocurrió un error'})
    })
}

function showUsers(req, res){
    dbconn.query('SELECT nivelCuenta,nombre, Apellido_paterno FROM `cuenta` WHERE 1')
    .then(rows=>{
        res.status(200).json({
            status:200,
            usuarios:rows
        }).catch(err=>{
            res.status(401).json({
                msg:'Error al obtener usuarios',
                err:err
            })
        })
    })
}

function uploadProducts(req, res){
    const productos = req.body.selectionModel
    console.log(productos)
    if( productos === undefined){
        res.status(400).json({error:'Productos no seleccionados',
        message:'Reintente seleccionar archivos'    })
    }else{
        for(let i =0;i<productos.length; i++){
            dbconn.query('SELECT `id`, `Clave`, `Descripción`, `Existencias`, `Línea`, `Unidad_de_entrada`, `Moneda`, `Fecha_ultima_compra`, `Ultimo_costo`, `Nombre_de_imagen`, `ID_SAE`, `Clave_unidad`, `Clave_alterna`, `Campo_libre` FROM `productos` WHERE id=?',[productos[i]])
            .then(rows=>{
                console.log(rows);
            }).catch(err=>{
                console.log(err);
                res.status(500).json({msg : 'ocurrió un error'})
            })
        }
        res.status(200).json({
            msg:'todo bien'
        })

    }
}

function updateProducts(req,res) {
    const datos = req.body
    console.log("datossssss::",datos.clave,datos.descripcion,datos.existencias,datos.unidad_de_entrada,datos.ultimoCosto,datos.campoLibre,datos.id)
    dbconn.query('UPDATE `productos` SET `Clave`=?,`Descripción`=?,`Existencias`=?,`Unidad_de_entrada`=?,`Ultimo_costo`=?,`Campo_libre`=? WHERE id=?',[datos.clave,datos.descripcion,datos.existencias,datos.unidad_de_entrada,datos.ultimoCosto,datos.campoLibre,datos.id])
    .then(rows=>{
        res.status(200).json({msg:'Actualizado con exito',data:datos})
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
    updateProducts
}