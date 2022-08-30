require("dotenv").config();


const express = require('express')

const { gen }  = require('n-digit-token');

const database = require('./userdb.js');

var xablito = require('./testesendmail.js'); 

const app = express()

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    required: true,
    rejectUnauthorized: false
  }
});

async function start(){
  await client.connect();
}

var generateToken = async (request,response)=>{
 
  var token = gen(6);

  console.log("novo token ",token)

  database.resetToken(token);

  db = await database.getEmails();

  enviarEmails = db.forEach(x => {
      if(x.status){
      xablito.sendMail(x.email, 'Recuperação de senha', '-', `Seu Token é ${token}`, 'gabriel_campos@esturdante.sc.senai.br', 'RECUPERAÇÃO AUDIODESCRIÇÃO');
    }    
    });


  // client.query('SELECT * FROM usuarios WHERE status = true', (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   a = results.rows.forEach(x => {
  //     sendEmail.sendElasticEmail(x.email, 'Recuperação de senha', '-', `Seu Token é ${token}`, 'gabriel_campos@esturdante.sc.senai.br', 'RECUPERAÇÃO AUDIODESCRIÇÃO');
  //   });
  //   response.status(200).json("xablau");
  // })


}


start();

// Start server
 app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening`)
 })

app.get('/recupera/senha/YXVkaW9kZXNjcmljYW8=',generateToken)

var sendEmail = require('./sendmail.js'); 

app.post('/autenticacao', function(request, response){
  client.query(`SELECT COUNT(password) FROM usuarios WHERE password = '${request.body.senha}'`, (error, results) => {
    if (error) {
      throw error
    }
    
    let resultado = parseInt(results.rows[0].count)
    response.status(200).json(resultado > 0);
  })
} )


app.post('/recebetoken', function(request, response){
  client.query(`SELECT COUNT(token) FROM usuarios WHERE token = '${request.body.token}'`, (error, results) => {
    if (error) {
      throw error
    }
    
    let resultado = parseInt(results.rows[0].count)
    response.status(200).json(resultado > 0);
  })
} )



app.post('/trocasenha', function(request, response){
  client.query(`UPDATE usuarios SET password = '${request.body.novasenha}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(true);
  })
} )

app.post('/admin/email', function(request, response){
  client.query(`UPDATE usuarios SET status = ${request.body.status} WHERE email = '${request.body.email}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(true);
  })
})


app.post('/admin/addemail', function(request, response){
  client.query(`insert into usuarios(id,password,email,token,status) values ((select count(id) from usuarios)+1,(select password from usuarios where id =1),'${request.body.email}','1',${request.body.status})`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(true);
  })
})

app.post('/admin/deletaremail', function(request, response){
  client.query(`DELETE FROM usuarios WHERE email = '${request.body.email}'`, (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(true);
  })
})

app.get('/admin/showemail', function(request, response){
  client.query('select email,status from usuarios', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows);
  })
})


app.get('/xablau', function(request, response){
   response.status(200).json(database.run());
  })







