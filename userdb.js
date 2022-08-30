const CyclicDB = require('cyclic-dynamodb')
const db = CyclicDB("dead-puce-puppy-robeCyclicDB") 

baseItem = async function (){
    
    let narrador = db.collection('usuarios')
    let item = await narrador.get('usuario')

    console.log('token antigo db: ',item.props.token)

    return item
}


const getEmails = async function () {
    let narrador = db.collection('usuarios')
    
    let item = await narrador.get('usuario')
    return (item.props.emails)
}

const resetToken = async function (newToken) {
    
    let narrador = db.collection('usuarios')

    let newItem = await baseItem()

    newItem.props.token = newToken

    let usuario = await narrador.set('usuario', newItem.props) 

    let item = await narrador.get('usuario')
}


module.exports = { getEmails,resetToken,baseItem};
