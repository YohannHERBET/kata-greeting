
const fileReader = require("./fileGestion/fileReader.js")

class Greeting {
  constructor(employeesFile) {
    this.employeesFile = employeesFile
  }
  
  birthDayGreeting() {
    
    try {
       let fileContent = fileReader.readFile(this.employeesFile);

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
                      return this.greetWhenIsBirthDay(informations)
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
     return this.sendEmail(
        informations[3],
        "Joyeux Anniversaire !",
        "Bonjour " + informations[0] + ",Joyeux Anniversaire !A bientôt,"
    );
  }

  sendEmail(to, title, body) {
    return "Sending email to : " + to + "Title: " + title + "Body: Body" + body
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