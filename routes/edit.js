var express = require("express");
var router = express.Router();
const mongo = require("../src/mongo");

var semestry = {
    "semestr 1": ["Algebra", "Analiza matematyczna 1", "Chemia", "Fizyka 1", "Podstawy informatyki", "Podstawy programowania", "Prawo patentowe"],
    "semestr 2": ["Algorytmy i struktury danych 1", "Analiza Matematyczna 2", "Architektury komputerow", "Fizyka 2", "Programowanie obiektowe", "Systemy operacyjne"],
    "semestr 3": [
        "Algorytmy i struktury danych 2",
        "Nowoczesne materiały",
        "Podstawy baz danych",
        "Projektowanie oprogramowania",
        "Rownania rozniczkowe i rachunek wariacyjny",
        "Sieci komputerowe i administracja systemow",
    ],
};

router.get("/:location/:filename", function (req, res) {
    //console.log(req.params.filename);
    async function findfile() {
        try {
            const respond = await mongo.findFile(req.params.location, req.params.filename);
            res.render("editinfo", {
                kierunek: "Inżynieria Obliczeniowa",
                semestry: semestry,
                file: respond,
            });
        } catch (error) {
            console.log(error);
        }
    }

    findfile();
});

router.post("/:location/:filename", function (req, res, next) {
    console.log(req.params);
    console.log(req.body);
    async function Update() {
        try {
            const respond = await mongo.updateFile(req.body, req.params);
            res.redirect("/" + req.params.location);
        } catch (error) {
            console.log(error);
        }
    }

    Update();
});

module.exports = router;
