var express = require("express");
var router = express.Router();
const postgres = require("../src/postgres");
const semestry = require("./subjectList");
const log = require("../src/logs");
var fs = require('fs');


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
        const respond = await postgres.findDir(coll, dir, location); //(subject, req.params.filename)
        if (respond != "")
            respond.sort((a, b) => (a.originalname > b.originalname ? 1 : b.originalname > a.originalname ? -1 : 0));

        res.render("subjectsubpage", {
            originalSubject: fullDir,
            subject: fullDir,
            kierunek: "Inżynieria Obliczeniowa",
            semestry: semestry,
            collection: respond,
            prev: prevDir,
        });
    } catch (error) {
        log.Error("fileinfo.finddir\n" + error)
    }
}

async function findfile_render(coll, name, location, res) {
    try {
        console.log('fileinfo.findfile_render')

        const respond = await postgres.findFile(coll, name, location); //(subject, req.params.filename, subject);
        var file = respond[0]
        ext = file.filename.split(".")[file.filename.split(".").length - 1].toLowerCase()
        //console.log(ext)
        //respond.sort((a, b) => (a.originalname > b.originalname ? 1 : b.originalname > a.originalname ? -1 : 0));
        //console.log(respond)
        var text, img = false, temp = false;
        var extensionList = ["txt", "c", "cpp", "js", "html", "java"]

        extensionList.forEach((el) => {
            if (el == ext) temp = true;
        })
        if (ext == "png" || ext == "jpg")
            img = true;
        if (temp)
            try {
                var data = fs.readFileSync('public/uploads/' + location + '/' + file.filename, 'utf8');
                text = data.toString();
            } catch (e) {
                log.Error("fileinfo.findfile_render\n" + error)
            }
        res.render("fileinfo", {
            subject: file.originalname,
            kierunek: "Inżynieria Obliczeniowa",
            semestry: semestry,
            file: file,
            prev: location,
            text: text,
            img: img
        });

    } catch (error) {
        log.Error("fileinfo.findfile_render\n" + error)
    }
}

router.get("/*/:filename", function (req, res) {
    //console.log(`${__dirname}/../uploads/${req.params.location}/${req.params.name}`)
    subject = req.originalUrl.split("/")[req.originalUrl.split("/").length - 2 - req.params[0].split("/").length];
    if (isFile(req.params.filename)) findfile_render(subject, req.params.filename, req.params[0], res);
    else finddir(subject, req.params[0], req.params.filename, res);

});

router.get("/:filename", function (req, res) {
    subject = req.originalUrl.split("/")[req.originalUrl.split("/").length - 2];
    if (isFile(req.params.filename)) findfile_render(subject, req.params.filename, subject, res);
    else finddir(subject, subject, req.params.filename, res);
});

module.exports = router;
