require("dotenv").config();


const express = require('express')

const { gen }  = require('n-digit-token');

const database = require('./userdb.js');

var TakeoutSendEmail = require ('./sendemail-takeout')

var ApiSendEmail = require ('./sendemail-api.js')

const app = express()

app.use(express.json()) 


var generateToken =  async (request,response)=>{
 
  var token = gen(6);

  database.resetToken(token);

  db = await database.getEmails();

    for (const x of db) {
        if(x.status){
        retorno = await ApiSendEmail.sendEmail(x.email,token)
        console.log(x.email)
        console.log(token)
        console.log(retorno)}
      }

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

app.post('/admin/email', async function(request, response){
    await database.ChangeStatusEmail(request.body.email, request.body.status)
    response.status(200).json(true);
})

app.post('/admin/addemail',async function(request, response){
    await database.AddEmail(request.body.email,request.body.status)
    response.status(200).json(true);
})

app.post('/admin/deletaremail',async function(request, response){
    await database.DeleteEmail(request.body.email)
    response.status(200).json(true);
})

app.get('/admin/showemail',async function(request, response){
    showEmails = await database.getEmails()
    response.status(200).json(showEmails);
})

const path = require('path');

app.use('/admin/ui', express.static('public'));

