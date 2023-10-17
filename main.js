const Greeting = require('./birthdayGreeting.js');

function init () {
  const greeting = new Greeting("./employees.txt");
  greeting.birthDayGreeting();
}

init();