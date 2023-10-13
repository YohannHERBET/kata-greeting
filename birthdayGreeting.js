const fs = require("fs");

class Greeting {

  birthDayGreeting() {
    let fileName = "./employees.txt";

    try {
      if (fs.existsSync(fileName)) {
        //On peut créer une fonction
        const readedFile = fs.readFileSync(fileName);
        let fileContent = readedFile.toString().split("\n");
        console.log("Reading file...");
        let isHeader = true;
        for (let fileInformations of fileContent) {
          try {
            if (isHeader) {
              isHeader = false;
            } else {
                const informations = fileInformations.split(",");
                this.sanitizeFileInformations(informations);
                this.isValidInformations(informations)
                const extractDateFromInformations = informations[2].split("/");
                this.isValidDate(extractDateFromInformations);
                const actualDate = new Date();
                this.isActualDateIsBirthday(actualDate, extractDateFromInformations);                 
                this.greetWhenIsBirthDay(informations)      
            }
          } catch (e) {
            console.log(e);
            console.error("Error reading file '" + fileName + "'");
          }
        }
        console.log("Batch job done.");
      } else {
        throw new Error("Unable to open file '" + fileName + "'");
      }
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