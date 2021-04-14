const router = require("express").Router();
const notas = require("../db/notas");

router.get("/notes", function(req, res) {
    notas
        .getNotas()
        .then(notes => res.json(notes))
        .catch(err => res.status(500).json(err));
});

router.post("/notes", function(req, res) {
    notas
        .addNota(re.body)
        .then((nota) => res.json(nota))
        .catch(err => res.status(500).json(err)); 
});

module.exports = router;