const db = require('cyclic-dynamodb')

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
