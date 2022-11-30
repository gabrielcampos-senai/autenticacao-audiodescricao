 CyclicDb = require("cyclic-dynamodb")
 db = CyclicDb("seu table name aqui")

baseItem = async function (){
    
    let narrador = db.collection('usuarios')
    let item = await narrador.get('usuario')

    let usuario = await narrador.set('usuario', {
        senha: 'senha1',
        token: '1234',
        emails:
            [
                {"email":"tusilhs@gmail.com","status":false},
                {"email":"tusilhs@hotmail.com","status":false},
                {"email":"tusisousa@gmail.com","status":false},
            ]
    }) 

    x = await narrador.get('usuario')
    console.log (x)
    console.log(x.props)
    console.log("Banco populado com sucesso")
}

module.exports = {baseItem};
