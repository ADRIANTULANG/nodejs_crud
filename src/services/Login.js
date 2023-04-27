const Connection = require('../database/Connection')

module.exports = async (username,password) => {
    try {
        const query = `SELECT * FROM tbl_admins WHERE username='${username}' and password='${password}'`
        console.log(query)
        await Connection(query)
    } catch (result) {
        console.log(result)
        if(result['errno'] == null && result['sqlState'] == null){
            return result
        }else{
            return false
        }
    }
    
}