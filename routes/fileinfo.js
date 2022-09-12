var express = require("express");
var router = express.Router();
const mongo = require("../src/mongo");

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

router.get("/:filename", function (req, res, next) {
    async function findfile_render() {
        try {
            const respond = await mongo.findFile(req.originalUrl.split("/")[1], req.params.filename);

            res.render("fileinfo", {
                subject: respond[0].originalname,
                kierunek: "Inżynieria Obliczeniowa",
                semestry: semestry,
                file: respond,
            });
        } catch (error) {
            console.log(error);
        }
    }

    findfile_render();
});
// { title: "Express", kierunek: "Inżynieria Obliczeniowa", semestry: semestry }

module.exports = router;
