const TakeoutClient = require('takeout.js')
const client = new TakeoutClient()
client.login('WFH81FYLA70KC0ZQIF3AFI')

sendEmail = async function (email,token) {

const emailTemplate = {
    to: email,
    from: 'Takeout.js', // This will be (e.g) 'Takeout.js via Takeout' for free users
    subject: `Recuperação de token - ${token} - ${email}`,
    html: `<b>seu token para recuperação de senha é ${token}</b>`,
}

   sendingStatus =  await client.send(emailTemplate)
    
   return sendingStatus
}
        
module.exports = {sendEmail}
