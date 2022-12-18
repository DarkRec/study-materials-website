var express = require("express");
var router = express.Router();
const postgres = require("../src/postgres");
const semestry = require("./subjectList");
const log = require("../src/logs");

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
    var subCheck = false;
    var subject = req.params.sub.replace(/(-)/g, " ");
    subject = subject.charAt(0).toUpperCase() + subject.slice(1);
    subjectsList.forEach((el) => {
        if (el == subject) subCheck = true;
    });

    async function Subject() {
        try {
            const respond = await postgres.listCollection(req.params.sub)
            if (respond)
                respond.sort((a, b) => (a.originalname > b.originalname ? 1 : b.originalname > a.originalname ? -1 : 0));
            res.render("subjectsubpage", {
                originalSubject: req.params.sub,
                subject: subject,
                kierunek: "Inżynieria Obliczeniowa",
                semestry: semestry,
                collection: respond,
            });
        } catch (error) {
            log.Error("subject.Subject\n"+error)
        }
    }

    Subject();
});

module.exports = router;
