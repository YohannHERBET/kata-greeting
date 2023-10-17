const Greeting = require('../birthdayGreeting.js')

let greeting

beforeAll(() => {
  greeting = new Greeting("./tests/testingFile/fakeEmployees.txt");
})

describe("Test end to end", () => {

  it("say happy birthday Jean, Santana", () => {
    const test = greeting.birthDayGreeting();
    expect(test).toBe("Sending email to : benoit@artisandeveloppeur.frTitle: Joyeux Anniversaire !Body: BodyBonjour Jean,Joyeux Anniversaire !A bientôt,");
  })
})