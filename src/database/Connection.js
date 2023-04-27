const mysql = require('mysql')

const dbConfig = {
    host: "localhost",
    user: "root",
    password: "",
    port: 3306,
    database: "queuing_system"
}
const dbConnection = mysql.createPool(dbConfig)

module.exports = (query) => {
    return new Promise((reject,resolve) => {
        dbConnection.getConnection((err, sql) => {
            if(err){
               console.log("NAAY ERROR: ", err)
              reject(err)
            } else {
              sql.query(query, (error,results) => {
                  if(error){
                    console.log("NAAY ERROR: ", error)
                    console.log(error)
                    reject(query)
                  }else{
                    resolve(results)
                  }
                  sql.release
                })
            }
        })
    })
}