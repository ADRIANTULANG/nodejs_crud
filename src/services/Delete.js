const Connection = require('../database/Connection')

module.exports = async (string_id) => {
    try {
        const query = `DELETE FROM tbl_admins` + ` WHERE admin_id in (${string_id})`
        console.log(query)
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