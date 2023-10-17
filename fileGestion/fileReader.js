const fs = require("fs");

class FileReader {

    static readFile(fileName) {

      if (fs.existsSync(fileName)) {
        const readedFile = fs.readFileSync(fileName);
        let fileContent = readedFile.toString().split("\n");
        console.log("Reading file...");
        return fileContent
        
      } else {
        throw new Error("File" + fileContent + "not found")
      }
    }
}

module.exports = FileReader;