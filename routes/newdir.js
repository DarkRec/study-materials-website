var express = require("express");
var router = express.Router();
const fs = require("fs");
const postgres = require("../src/postgres");
const log = require("../src/logs");

router.post("/", function (req, res, next) {
    //console.log('newdir')
    if (req.body.folder != "") {
    }

    const letters = ["ą", "ć", "ę", "ł", "ń", "ó", "ś", "ź", "ż"];
    const replacement = ["a", "c", "e", "l", "n", "o", "s", "z", "z"];

    let result = req.body.folder.toLocaleLowerCase();

    for (let i = 0; i < letters.length; ++i) {
        //result = result.replaceAll(letters[i], replacement[i]);
        result = result.split(letters[i]).join(replacement[i]);
    }
    result = result.replace(/\s/g, "-");

    newListing = {
        filename: result,
        location: req.body.url,
    };

    async function NewDir() {

        try {
            await postgres.createDir(req.body.url.split("/")[0], newListing);
        } catch (error) {
            log.Error("newdir.newDir\n" + error)
        }
    }
    if (!fs.existsSync("public/uploads/" + req.body.url.split("/")[0])) {
        fs.mkdirSync("public/uploads/" + req.body.url.split("/")[0]);
    }
    var dir = "public/uploads/" + req.body.url + "/" + result + "/";
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        NewDir();
    }
    res.redirect("/" + req.body.url);
});

module.exports = router;
