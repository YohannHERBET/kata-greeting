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
        // ---
        let isHeader = true;
        // fonction
        for (let fileInformations of fileContent) {
          try {
            if (isHeader) {
              isHeader = false;
            } else {
              let informations = fileInformations.split(",");
              for (let informationCount = 0; informationCount < informations.length; informationCount++) {
                informations[informationCount] = informations[informationCount].trim();
              }
               this.informationSanitizer(informations);
            }
          } catch (e) {
            console.log(e);
            console.error("Error reading file '" + fileName + "'");
          }
        }
        // ---
        console.log("Batch job done.");
      } else {
        throw new Error("Unable to open file '" + fileName + "'");
      }
    } catch (error) {
      console.error("Error reading file '" + fileName + "'");
    }
  }

  informationSanitizer(informations) {
    if (informations.length == 4) {
      const extractDateFromInformations = informations[2].split("/");
      if (extractDateFromInformations.length == 3) {
        let actualDate = new Date();
        if (actualDate.getDate() == Number.parseInt(extractDateFromInformations[0]) && actualDate.getMonth() == Number.parseInt(extractDateFromInformations[1]) - 1) {
         this.greetWhenIsBirthDay(informations)
        }
      } else {
        throw new Error("Cannot read birthdate for " + informations[0] + " " + informations[1]);
      }
    } else {
      throw new Error("Invalid file format");
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
}

module.exports = Greeting;