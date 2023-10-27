const Greeting = require('../birthdayGreeting.js')

let greeting
let todayDate
let informations = [' Jean ', ' Santana ', ' 20/10/1979 ', ' benoit@artisandeveloppeur.fr ', '']
let birthdayDate = []

class MockEmailBroker {
  static sendEmail(to, title, body) {
      return "Sending email to : " + to + "Title: " + title + "Body: Body" + body
  }
}

class MockSmsBroker {
  static sendSms(to, title, body) {
      return "Sending sms to : " + to + "Title: " + title + "Body: Body" + body
  }
}
class MockMessage  {
 
  static sendMessage(email,firstname, phone) {
   if(email){
      return MockEmailBroker.sendEmail(email, "Joyeux Anniversaire !","Bonjour " + firstname + ",Joyeux Anniversaire !A bientôt," )
   } else {
      return MockSmsBroker.sendSms(phone, "Joyeux Anniversaire !","Bonjour " + firstname + ",Joyeux Anniversaire !A bientôt," )
   }
  }
}

beforeAll(() => {
  todayDate = new Date("2023-10-20");
  birthdayDate = ["20", "10", "2023"];
  greeting = new Greeting("./tests/testingFile/fakeEmployees.txt", todayDate, MockMessage);
})

describe("Test end to end", () => {

  it("say happy birthday if the employee have a phone", () => {
    greeting = new Greeting("./tests/testingFile/fakeEmployees.txt", new Date("2023-10-25"), MockMessage)
    const test = greeting.birthDayGreeting();
    expect(test).toBe("Sending sms to : 0612345678Title: Joyeux Anniversaire !Body: BodyBonjour John,Joyeux Anniversaire !A bientôt,");
  })
  it("say happy birthday if the employee have a phone", () => {
    greeting = new Greeting("./tests/testingFile/fakeEmployees.txt", new Date("2023-10-20"), MockMessage)
    const test = greeting.birthDayGreeting();
    expect(test).toBe("Sending email to : benoit@artisandeveloppeur.frTitle: Joyeux Anniversaire !Body: BodyBonjour Jean,Joyeux Anniversaire !A bientôt,");
  })
})

describe('Functions one by one', () => {
  

  it("it should return Sending email to", () => {
    const sendEmail = MockEmailBroker.sendEmail("benoit@artisandeveloppeur.fr", "Joyeux Anniversaire !", "Bonjour " + "Jean" + ",Joyeux Anniversaire !A bientôt,");
    expect(sendEmail).toBe('Sending email to : benoit@artisandeveloppeur.frTitle: Joyeux Anniversaire !Body: BodyBonjour Jean,Joyeux Anniversaire !A bientôt,')
  })

  it("it should sanitize file informations", () => {
    const sanitizeFileInformations = greeting.sanitizeFileInformations(informations);
    expect(sanitizeFileInformations).toStrictEqual(['Jean', 'Santana', '20/10/1979', 'benoit@artisandeveloppeur.fr', ''])
  })

  it("it should valid informations", () => {
    const isValidInformations = greeting.isValidInformations(informations);
    expect(isValidInformations).toBe(true);
  })

  it("it should check if the actual date is a birthday", () => {
    const isActualDateIsBirthday = greeting.isActualDateIsBirthday(todayDate, birthdayDate);
    expect(isActualDateIsBirthday).toBe(true)
  })

  it("it should valid date", () => {
    const isValidDate = greeting.isValidDate(birthdayDate);
    expect(isValidDate).toBe(true)
  })

  it("it should valid date greet when it birthday", () => {
    const greetWhenIsBirthDay = MockMessage.sendMessage(informations[3], informations[0])
    expect(greetWhenIsBirthDay).toBe('Sending email to : benoit@artisandeveloppeur.frTitle: Joyeux Anniversaire !Body: BodyBonjour Jean,Joyeux Anniversaire !A bientôt,')
  })
})

describe('Sms broker en sms sender', () => {
   it("it should return Sending sms to", () => {
    const sendSMS = MockSmsBroker.sendSms("0612345678", "Joyeux Anniversaire !", "Bonjour " + "Jean" + ",Joyeux Anniversaire !A bientôt,");
    expect(sendSMS).toBe('Sending sms to : 0612345678Title: Joyeux Anniversaire !Body: BodyBonjour Jean,Joyeux Anniversaire !A bientôt,')
  })
})


