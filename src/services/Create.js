const Connection = require('../database/Connection')

module.exports = async (username,password,firstname,lastname) => {
    try {
        const query = `INSERT INTO` + ` tbl_admins` + ` VALUES` + `(null, '${username}','${password}','${firstname}','${lastname}')`
        await Connection(query)
    } catch (result) {
        console.log(result)
        if(result['errno'] == null && result['sqlState'] == null){
            try {
                let last_inserted_id = result['insertId']
                const secondquery = `SELECT * FROM tbl_admins WHERE admin_id = ${last_inserted_id}`
                await Connection(secondquery)
            } catch (secondresult) {
                if(secondresult['errno'] == null && secondresult['sqlState'] == null){
                    return secondresult
                }else{
                    return false
                }
            }
        }else{
            return false
        }
    }
    
}