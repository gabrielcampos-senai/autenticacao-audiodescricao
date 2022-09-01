require("dotenv").config();


const express = require('express')

const { gen }  = require('n-digit-token');

const database = require('./userdb.js');

var TakeoutSendEmail = require ('./sendemail-takeout')

const app = express()

app.use(express.json()) 


var generateToken =  async (request,response)=>{
 
  var token = gen(6);

  database.resetToken(token);

  db = await database.getEmails();

  enviarEmails = db.forEach(x => {
      if(x.status){
        TakeoutSendEmail.sendEmail(x.email,token)
      }    
    });
    response.status(200).json();
}


// Start server
 app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening`)
 })

app.get('/recupera/senha/YXVkaW9kZXNjcmljYW8=',generateToken)



var sendEmail = require('./sendmail.js'); 


app.post('/recebetoken', async function(request, response){
 
    dbToken = await database.getToken();
    response.status(200).json(request.body.token === dbToken);
} )

app.post('/autenticacao', async function(request, response){
    dbSenha = await database.getSenha();
    response.status(200).json(request.body.senha === dbSenha);
})

app.post('/trocasenha', async function(request, response){
  await database.setSenha(request.body.novasenha)
  response.status(200).json(true);
})

// app.post('/trocasenha', function(request, response){
//   client.query(`UPDATE usuarios SET password = '${request.body.novasenha}'`, (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(true);
//   })
// } )

// app.post('/admin/email', function(request, response){
//   client.query(`UPDATE usuarios SET status = ${request.body.status} WHERE email = '${request.body.email}'`, (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(true);
//   })
// })


// app.post('/admin/addemail', function(request, response){
//   client.query(`insert into usuarios(id,password,email,token,status) values ((select count(id) from usuarios)+1,(select password from usuarios where id =1),'${request.body.email}','1',${request.body.status})`, (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(true);
//   })
// })

// app.post('/admin/deletaremail', function(request, response){
//   client.query(`DELETE FROM usuarios WHERE email = '${request.body.email}'`, (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(true);
//   })
// })

// app.get('/admin/showemail', function(request, response){
//   client.query('select email,status from usuarios', (error, results) => {
//     if (error) {
//       throw error
//     }
//     response.status(200).json(results.rows);
//   })
// })









