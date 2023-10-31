const EmailBroker = require('./emailBroker.js')
const SmsBroker = require('./smsBroker.js')
class Message  {
 
  static sendMessage(email, firstname, phone) {
    if(email) {
      return EmailBroker.sendEmail(email, "Joyeux Anniversaire !","Bonjour " + firstname + ",Joyeux Anniversaire !A bientôt," )
    } else if(phone){
      return SmsBroker.sendSms(phone, "Joyeux Anniversaire !","Bonjour " + firstname + ",Joyeux Anniversaire !A bientôt," )
    } else {
      throw new Error("Error, doesn't have mail or phone");
    }
  }
}

module.exports = Message;