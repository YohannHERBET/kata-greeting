const Greeting = require('./birthdayGreeting.js');
const Message = require('./message.js')

function init () {
  const date = new Date()
  const greeting = new Greeting("./employees.txt", date, Message);
  greeting.birthDayGreeting();
}

init();