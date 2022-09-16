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
        "Rownania rożniczkowe i rachunek wariacyjny",
        "Sieci komputerowe i administracja systemow",
    ],
};

function isFile(last) {
    if (last.split(".").length > 1) return true;
    else return false;
}

async function finddir(coll, dir, location, res) {
    if (coll == dir) {
        fullDir = dir + "/" + location;
        prevDir = dir;
    } else {
        fullDir = coll + "/" + dir + "/" + location;
        prevDir = coll + "/" + dir;
    }
    try {
        const respond = await mongo.findDir(coll, dir, location); //(subject, req.params.filename)
        res.render("subjectsubpage", {
            originalSubject: fullDir,
            subject: fullDir,
            kierunek: "Inżynieria Obliczeniowa",
            semestry: semestry,
            collection: respond,
            prev: prevDir,
        });
    } catch (error) {
        console.log(error);
    }
}

async function findfile_render(coll, name, location, res) {
    try {
        const respond = await mongo.findFile(coll, name, location); //(subject, req.params.filename, subject);
        respond.sort((a, b) => (a.originalname > b.originalname ? 1 : b.originalname > a.originalname ? -1 : 0));
        res.render("fileinfo", {
            subject: respond[0].originalname,
            kierunek: "Inżynieria Obliczeniowa",
            semestry: semestry,
            file: respond,
            prev: location,
        });
    } catch (error) {
        console.log(error);
    }
}

router.get("/*/:filename", function (req, res) {
    subject = req.originalUrl.split("/")[req.originalUrl.split("/").length - 2 - req.params[0].split("/").length];
    if (isFile(req.params.filename)) findfile_render(subject, req.params.filename, req.params[0], res);
    else finddir(subject, req.params[0], req.params.filename, res);
});

router.get("/:filename", function (req, res) {
    subject = req.originalUrl.split("/")[req.originalUrl.split("/").length - 2];
    if (isFile(req.params.filename)) findfile_render(subject, req.params.filename, subject, res);
    else finddir(subject, subject, req.params.filename, res);
});
// { title: "Express", kierunek: "Inżynieria Obliczeniowa", semestry: semestry }

module.exports = router;
