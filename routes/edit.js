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

async function findfile(coll, name, location, res) {
    try {
        const respond = await mongo.findFile(coll, name, location);
        res.render("editinfo", {
            kierunek: "Inżynieria Obliczeniowa",
            semestry: semestry,
            file: respond,
        });
    } catch (error) {
        console.log(error);
    }
}

async function Update(coll, body, params, res) {
    try {
        const respond = await mongo.updateFile(coll, body, params);
        res.redirect("/" + params.location);
    } catch (error) {
        console.log(error);
    }
}

router.get("/:location/:filename", function (req, res) {
    findfile(req.params.location, req.params.filename, req.params.location, res);
});

router.get("/*/:location/:filename", function (req, res) {
    coll = req.originalUrl.split("/")[req.originalUrl.split("/").length - 2 - req.params[0].split("/").length];
    location = req.params[0].replace(coll, "").substring(1);
    if (location == "") findfile(coll, req.params.filename, req.params.location, res);
    else findfile(coll, req.params.filename, location + "/" + req.params.location, res);
});

router.post("/:location/:filename", function (req, res, next) {
    Update(req.params.location, req.body, req.params, res);
});

router.post("/*/:location/:filename", function (req, res) {
    coll = req.originalUrl.split("/")[req.originalUrl.split("/").length - 2 - req.params[0].split("/").length];
    req.params.location = req.params[0] + "/" + req.params.location;
    Update(coll, req.body, req.params, res);
});

module.exports = router;
