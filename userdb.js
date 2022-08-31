const db = require('cyclic-dynamodb')

process.env.CYCLIC_DB = process.env.CYCLIC_DB || 'db-sdkCyclicDB'
process.env.AWS_REGION = process.env.AWS_REGION || 'sa-east-1'

baseItem = async function (){
    
    let narrador = db.collection('usuarios')
    let item = await narrador.get('usuario')

    return item
}


const getEmails = async function () {
    let narrador = db.collection('usuarios')
    
    let item = await narrador.get('usuario')
    return (item.props.emails)
}

const resetToken = async function (newToken) {
    
    let narrador = db.collection('usuarios')

    await narrador.set('usuario',{token: newToken}) 
}


const getToken = async function () {
    
    let narrador = db.collection('usuarios')

    let item = await narrador.get('usuario')

    return item.props.token
}


module.exports = { getEmails,resetToken,baseItem,getToken};
