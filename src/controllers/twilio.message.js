const accountSid = process.env.ACCOUNT_SID;
const accountToken = process.env.ACCOUNT_TOKEN;

export const client = require('twilio')(accountSid, accountToken);


client.messages.create({
   to: '+2349033524249',
   from: '+13125481221',
   body: 'i am testing how message works'
})
.then(res => console.log(res))
.catch(e => console.log(e))