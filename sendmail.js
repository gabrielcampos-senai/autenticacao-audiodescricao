var querystring = require('querystring');
var https = require('https');

function sendElasticEmail(to, subject, body_text, body_html, from, fromName) {
   var post_data = querystring.stringify({ 'username' : 'gabriel_campos@esturdante.sc.senai.br', 'api_key': 'C40E4E94EA91B4F658E9B373A2E5322A37EBB4565CE434DDE2401F1925BA5300EF8DCF4532276A4F3F67268B049BF09B', 'from': from, 'from_name' : fromName, 'to' : to, 'subject' : subject, 'body_html' : body_html, 'body_text' : body_text });
var post_options = { host: 'api.elasticemail.com', path: '/mailer/send', port: '443', method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': post_data.length } }; var result = '';  var post_req = https.request(post_options, function(res) { res.setEncoding('utf8'); res.on('data', function (chunk) { result = chunk; }); res.on('error', function (e) { result = 'Error: ' + e.message; }); });
 post_req.write(post_data); post_req.end(); return result;}

module.exports = { sendElasticEmail };
