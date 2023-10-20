const Greeting = require('./birthdayGreeting.js');

function init () {
  const date = new Date()
  const greeting = new Greeting("./employees.txt", date);
  greeting.birthDayGreeting();
}

init();