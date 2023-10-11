const Greeting = require('./birthdayGreeting.js');

function init () {
  const greeting = new Greeting();
  greeting.birthDayGreeting();
}

init();