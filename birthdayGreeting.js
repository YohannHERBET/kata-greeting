
const fileReader = require("./fileGestion/fileReader.js")

class Greeting {

  birthDayGreeting() {
    let fileName = "./employees.txt";

    try {
       let fileContent = fileReader.readFile(fileName);

        let isHeader = true;
        for (let fileInformations of fileContent) {
          try {
            if (isHeader) {
              isHeader = false;
            } else {
                let informations = fileInformations.split(",");
                if (this.isValidInformations(this.sanitizeFileInformations(informations))) {
                  const extractDateFromInformations = informations[2].split("/");
                  if (this.isValidDate(extractDateFromInformations)) {
                    const actualDate = new Date();
                    if (this.isActualDateIsBirthday(actualDate, extractDateFromInformations)) {
                      this.greetWhenIsBirthDay(informations)
                    }                 
                  }
                }
            }
          } catch (e) {
            console.log(e);
            console.error("Error reading file '" + fileName + "'");
          }
        }
        console.log("Batch job done.");
    } catch (error) {
      console.error("Error reading file '" + fileName + "'");
    }
  } 

  greetWhenIsBirthDay(informations) {
     this.sendEmail(
        informations[3],
        "Joyeux Anniversaire !",
        "Bonjour " + informations[0] + ",\nJoyeux Anniversaire !\nA bientôt,"
    );
  }

  sendEmail(to, title, body) {
    console.log("Sending email to : " + to);
    console.log("Title: " + title);
    console.log("Body: Body\n" + body);
    console.log("-------------------------");
  }
  
  sanitizeFileInformations (informations) {
    for (let informationCount = 0; informationCount < informations.length; informationCount++) {
      informations[informationCount] = informations[informationCount].trim();
    }
    return informations
  }

  isValidInformations(informations) {
    return informations.length == 4;
  }

   isValidDate(extractDateFromInformations) {
    return extractDateFromInformations.length == 3;
  }

  isActualDateIsBirthday(actualDate, extractDateFromInformations) {
    return actualDate.getDate() == Number.parseInt(extractDateFromInformations[0]) && actualDate.getMonth() == Number.parseInt(extractDateFromInformations[1]) - 1
  }
}

module.exports = Greeting;