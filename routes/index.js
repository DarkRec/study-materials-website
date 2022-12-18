var express = require("express");
var router = express.Router();
const semestry = require("./subjectList");

var counter = 0;

/* GET home page. */
router.get("/", function (req, res, next) {
    //counter++;
    //console.log(counter,":", req.socket.remoteAddress.split(":").slice(-1)[0])
    /*
    if (req.session.open != undefined) {
    } else {
        req.session.open = 0;
    }
    console.log(req.session.open);*/
    res.render("index", { title: "Express", kierunek: "Inżynieria Obliczeniowa", semestry: semestry });
});

module.exports = router;
