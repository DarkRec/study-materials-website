var express = require("express");
var Article = require("../public/models/artice");
var router = express.Router();

var semestry = {
    "semestr 1": ["Algebra", "Analiza matematyczna 1", "Chemia", "Fizyka 1", "Podstawy informatyki", "Podstawy programowania", "Prawo patentowe"],
    "semestr 2": ["Algorytmy i struktury danych 1", "Analiza Matematyczna 2", "Architektury komputerów", "Fizyka 2", "Programowanie obiektowe", "Systemy operacyjne"],
    "semestr 3": [
        "Algorytmy i struktury danych 2",
        "Nowoczesne materiały",
        "Podstawy baz danych",
        "Projektowanie oprogramowania",
        "Równania różniczkowe i rachunek wariacyjny",
        "Sieci komputerowe i administracja systemów",
    ],
};

router.get("/:sem/:sub", function (req, res, next) {
    var article = new Article({})
    let subject = req.params.sub.replace(/(-)/g, " ");
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    res.render("subjectsubpage", { subject: subject, kierunek: "Inżynieria Obliczeniowa", semestry: semestry });
});

module.exports = router;
