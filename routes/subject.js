var express = require("express");
var router = express.Router();
const mongo = require("../src/mongo");

var semestry = {
    "semestr 1": ["Algebra", "Analiza matematyczna 1", "Chemia", "Fizyka 1", "Podstawy informatyki", "Podstawy programowania", "Prawo patentowe"],
    "semestr 2": [
        "Algorytmy i struktury danych 1",
        "Analiza Matematyczna 2",
        "Architektury komputerow",
        "Fizyka 2",
        "Programowanie obiektowe",
        "Systemy operacyjne",
    ],
    "semestr 3": [
        "Algorytmy i struktury danych 2",
        "Nowoczesne materiały",
        "Podstawy baz danych",
        "Projektowanie oprogramowania",
        "Rownania rozniczkowe i rachunek wariacyjny",
        "Sieci komputerowe i administracja systemow",
    ],
};
/*
var semestry = [
    ["Algebra", "Analiza matematyczna 1", "Chemia", "Fizyka 1", "Podstawy informatyki", "Podstawy programowania", "Prawo patentowe"],
    ,
    ["Algorytmy i struktury danych 1", "Analiza Matematyczna 2", "Architektury komputerow", "Fizyka 2", "Programowanie obiektowe", "Systemy operacyjne"],
    ,
    [
        "Algorytmy i struktury danych 2",
        "Nowoczesne materiały",
        "Podstawy baz danych",
        "Projektowanie oprogramowania",
        "Rownania rozniczkowe i rachunek wariacyjny",
        "Sieci komputerowe i administracja systemow",
    ],
];*/

var subjectsList = [];
semestry["semestr 1"].forEach((element) => {
    subjectsList.push(element);
});
semestry["semestr 2"].forEach((element) => {
    subjectsList.push(element);
});
semestry["semestr 3"].forEach((element) => {
    subjectsList.push(element);
});

router.get("/:sub", function (req, res, next) {
    let subCheck = false;
    let subject = req.params.sub.replace(/(-)/g, " ");
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    subjectsList.forEach((el) => {
        if (el == subject) subCheck = true;
    });

    async function Subject() {
        try {
            const respond = await mongo.listCollection(req.params.sub);
            respond.sort((a, b) => (a.originalname > b.originalname ? 1 : b.originalname > a.originalname ? -1 : 0));
            res.render("subjectsubpage", {
                originalSubject: req.params.sub,
                subject: subject,
                kierunek: "Inżynieria Obliczeniowa",
                semestry: semestry,
                collection: respond,
            });
        } catch (error) {
            console.log(error);
        }
    }

    Subject();
});

module.exports = router;
