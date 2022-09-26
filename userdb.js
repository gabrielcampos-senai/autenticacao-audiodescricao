var db;
if (process.env.ENVIRONMENT != 'dev'){ db = require('cyclic-dynamodb')}
else
{
     CyclicDb = require("cyclic-dynamodb")
     db = CyclicDb("dead-puce-puppy-robeCyclicDB")
}
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

const getSenha = async function () {
    
    let narrador = db.collection('usuarios')

    let item = await narrador.get('usuario')
    return item.props.senha
}

const setSenha = async function (novaSenha) {
    
    let narrador = db.collection('usuarios')

    let usuario = await narrador.set('usuario',{
        senha: novaSenha
    })
}

const ChangeStatusEmail = async function (EmailRequest,statusRequest){

    let narrador = db.collection('usuarios')

    dbBaseItem = await baseItem()

    getIndexObject =  dbBaseItem.props.emails.findIndex(b => b.email === EmailRequest);

    dbBaseItem.props.emails[getIndexObject].status = statusRequest

    if(getIndexObject != null){
        
        let usuario = await narrador.set('usuario',{ 
            emails : dbBaseItem.props.emails    
        })
    }
}

const DeleteEmail = async function (EmailRequest){

    let narrador = db.collection('usuarios')

    dbBaseItem = await baseItem()

    getIndexObject =  dbBaseItem.props.emails.findIndex(b => b.email === EmailRequest);

    dbBaseItem.props.emails.splice(getIndexObject,1)

    if(getIndexObject != null){
        
        let usuario = await narrador.set('usuario',{ 
            emails : dbBaseItem.props.emails    
        })
    }
}

const AddEmail = async function (EmailRequest,statusRequest){

    let narrador = db.collection('usuarios')

    dbBaseItem = await baseItem()

    getIndexObject =  dbBaseItem.props.emails.findIndex(b => b.email === EmailRequest);

    dbBaseItem.props.emails.push({"email": EmailRequest, status: statusRequest})

    if(getIndexObject != null && EmailRequest != null){
        
        let usuario = await narrador.set('usuario',{ 
            emails : dbBaseItem.props.emails    
        })
    }
}

module.exports = { getEmails,resetToken,baseItem,getToken,getSenha,setSenha,ChangeStatusEmail,DeleteEmail,AddEmail};
