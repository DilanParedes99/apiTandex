const mysql = require('mysql')
const server_config = require('config')

module.exports = () =>{
    let config = {
        host : server_config.get('db.host'),
        database : server_config.get('db.db'),
        user : server_config.get('db.user'),
        password : server_config.get('db.password'),
    }

    return new Database(config)
}

class Database {
    constructor(config) {
        this.connection = mysql.createConnection(config)
        //console.log(this.connection)
    }

    query(sql,args){
        return new Promise((resolve,reject) => {
            this.connection.query(sql, args, (err,rows) => {
                if(err) 
                    return reject(err)
                resolve(rows)
            })
        })
    }

    close (){
        return new Promise( (resolve,reject) => {
            this.connection.end(err=>{
                if(err)
                    return reject(err)
                resolve()    
            })
        })
    }
}
