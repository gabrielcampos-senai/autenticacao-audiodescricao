const db = require('cyclic-dynamodb')


baseItem = async function (){
    
    let narrador = db.collection('usuarios')
    let item = await narrador.get('usuario')

    let usuario = await narrador.set('usuario', {
        senha: 'senha1',
        token: '1234',
        emails:
            [
                {"email":"silvio.sousa@edu.sc.senai.br","status":false},
                {"email":"tusilhs@gmail.com","status":false},
                {"email":"tusilhs@hotmail.com","status":false},
                {"email":"tusisousa@gmail.com","status":false},
                {"email":"matheus_oliveira8@estudante.sc.senai.br","status":false},
                {"email":"gabriel_campos@estudante.sc.senai.br","status":true},
                {"email":"rafael_e@estudante.sc.senai.br","status":false}
            ]
    }) 

    x = await narrador.get('usuario')
    console.log (x)
    console.log(x.props)
    console.log("função rodada com sucesso")
}


module.exports = {baseItem};