var request = require('request');

sendEmail = async function (email,token) {

    var options = {
        'method': 'POST',
        'url': 'https://takeout.bysourfruit.com/api/email/send',
        'headers': {
            'Accept': '*/*',
            'Authorization': 'Token WFH81FYLA70KC0ZQIF3AFI',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            'sender': 'gabriel_campos@estudante.sc.senai.br',
            'receiver': email,
            'subject': 'TOKEN - RECUPERAÇÃO AUDIODESCRIÇÃO',
            'bodyText': 'NULL',
            'bodyHTML': 'Seu token de recuperação é '+token
        }
    };
    request(options, function (error, response) {
        if (error) throw new Error(error);
        console.log(response.body);
    });
}

module.exports = {sendEmail};