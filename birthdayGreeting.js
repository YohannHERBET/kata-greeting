
const fileReader = require("./fileGestion/fileReader.js")

class Greeting {

  constructor(employeesFile, date, message) {
    this.employeesFile = employeesFile
    this.date = date
    this.message = message
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
                  const actualDate = this.date
                  try {
                    if (this.isActualDateIsBirthday(actualDate, extractDateFromInformations)) {
                      return this.message.sendMessage(informations[3], informations[0], informations[4]);
                    }   
                  } catch (e) {
                    console.error("Error occurs at greet birthday")
                  } 
                }
              }
            }
          } catch (e) {
            console.log(e);
            console.error("Fail at sanitizing informations");
          }
        }
        console.log("Batch job done.");
    } catch (error) {
      console.error("Error reading file '" + fileName + "'");
    }
  } 
  
  sanitizeFileInformations (informations) {
    for (let informationCount = 0; informationCount < informations.length; informationCount++) {
      informations[informationCount] = informations[informationCount].trim();
    }
    return informations
  }

  isValidInformations(informations) {
    return informations.length == 5;
  }

   isValidDate(extractDateFromInformations) {
    return extractDateFromInformations.length == 3;
  }

  isActualDateIsBirthday(actualDate, extractDateFromInformations) {
    return actualDate.getDate() == Number.parseInt(extractDateFromInformations[0]) && actualDate.getMonth() == Number.parseInt(extractDateFromInformations[1]) - 1
  }
}

module.exports = Greeting;