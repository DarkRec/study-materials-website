var express = require("express");
var router = express.Router();

var semestry = {
    "semestr 1": ["Algebra", "Analiza matematyczna 1", "Chemia", "Fizyka 1", "Podstawy informatyki", "Podstawy programowania", "Prawo patentowe"],
    "semestr 2": [
        "Algorytmy i struktury danych 1",
        "Analiza Matematyczna 2",
        "Architektury komputerów",
        "Fizyka 2",
        "Programowanie obiektowe",
        "Systemy operacyjne",
    ],
    "semestr 3": [
        "Algorytmy i struktury danych 2",
        "Nowoczesne materiały",
        "Podstawy baz danych",
        "Projektowanie oprogramowania",
        "Równania różniczkowe i rachunek wariacyjny",
        "Sieci komputerowe i administracja systemów",
    ],
};

/* GET home page. */
router.get("/", function (req, res, next) {
    /*
    if (req.session.open != undefined) {
    } else {
        req.session.open = 0;
    }
    console.log(req.session.open);*/
    res.render("index", { title: "Express", kierunek: "Inżynieria Obliczeniowa", semestry: semestry });
});

module.exports = router;
