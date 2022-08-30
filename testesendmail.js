var sendpulse = require("sendpulse-api");
/*
 * https://login.sendpulse.com/settings/#api
 */
var API_USER_ID = "cf6f8b33f1d2fb937c08deb8ad6bd952";
var API_SECRET = "20f5af701933ff6018ee01a3f5f89d6d";
var TOKEN_STORAGE = "/tmp/";
 
sendpulse.init(API_USER_ID,API_SECRET,TOKEN_STORAGE,function() {
    sendpulse.listAddressBooks(console.log);
});
 var answerGetter = function(data) {
  console.log(data);
}

var email;

function sendMail(to, subject, body_text, body_html, from, fromName){
 email =  {"html" : body_html,
  "text" : body_text,
  "subject" : subject,
  "from" : {
    "name" : fromName,
    "email" : 'gabriel_campos@estudante.sc.senai.br'
  },
  "to" : [
    {
      "name" : "-",
      "email" : to
    },
  ]}
sendpulse.smtpSendMail(answerGetter,email);
return answerGetter;
}

module.exports = { sendMail };