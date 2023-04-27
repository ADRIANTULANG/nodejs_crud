const Connection = require('../database/Connection')

module.exports = async (username,password,firstname,lastname,id) => {
    try {
        const query = `UPDATE` + ` tbl_admins` + ` SET ` + `username='${username}', password='${password}', firstname='${firstname}', lastname='${lastname}'` + ` WHERE` + ` admin_id='${id}'`
        await Connection(query)

    } catch (result) {
        console.log(result)
        if(result['errno'] == null && result['sqlState'] == null){
            return true
        }else{
            return false
        }
    }
    
}