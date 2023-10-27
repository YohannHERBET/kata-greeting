const EmailBroker = require('./emailBroker.js')

class Message  {
 
  static sendMessage(email,firstname) {
    return EmailBroker.sendEmail(email, "Joyeux Anniversaire !","Bonjour " + firstname + ",Joyeux Anniversaire !A bientôt," )
  }
}

module.exports = Message;