const util = require("util");
const fs = requires("fs");

const uuidv1 = require ('uuid/v1'); // npm package to create unique id

const readFileAsync = util.promisify(fs.readFile); // reads file
const writeFileAsync = util.promisify(fs.writeFile);  // write file

class Notas {
    read() {
        return readFileAsync("db/db.json", "utf8");
    }

    write(nota) {
        return writeFileAsync("db/db.json", JSON.stringify(nota))
    }

    getNotas() {
        return this.read().then(nota => {
            let parseNotes;

            try {
                parseNotes = [].concat(JSON.parse(nota));
            } catch (err) {
                parseNotes = [] // if there is an error parse a empty array
            }

            return parseNotes;
        });
    }

    addNota(nota) {
        const { title,  text } = nota; // deconstructed nota cosnt

        if (!title || text) {
            throw new Error("Please enter a title and text. Try again");
        }

        const newNota = { title, text, id:uuidv1() };

        return this.getNotas()
            .then(nota => [...nota, newNota])
            .then(updatedNotas => this.write(updatedNotas))
            .then(() => newNota);
    }
}

module.exports = new Notas();