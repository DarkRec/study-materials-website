var express = require("express");
var router = express.Router();
const postgres = require("../src/postgres");
const semestry = require("./subjectList");
const log = require("../src/logs");

async function findfile(coll, name, location, res) {
    try {
        const respond = await postgres.findFile(coll, name, location);
        res.render("editinfo", {
            kierunek: "Inżynieria Obliczeniowa",
            semestry: semestry,
            file: respond,
        });
    } catch (error) {
        log.Error("edit.findfile\n" + error)
    }
}

async function Update(coll, body, params, res) {
    try {
        var d = Date.now();
        body.filename = body.filename.replace(/[^A-Za-z0-9\.-]/g, "-");
        var upload;
        if (body.filename == "" && body.info != "") upload = { info: body.info };
        else if (body.filename != "" && body.info == "") {
            if (body.filename.split(".").length == 1) body.filename = body.filename + "." + body.prevName.split(".")[body.prevName.split(".").length - 1];
            upload = { originalname: body.filename, filename: d + "-" + body.filename };
        } else if (body.filename != "" && body.info != "") {
            if (body.filename.split(".").length == 1) body.filename = body.filename + "." + body.prevName.split(".")[body.prevName.split(".").length - 1];
            upload = { originalname: body.filename, filename: d + "-" + body.filename, info: body.info };
        }

        if (upload) {
            await postgres.updateFile(coll, upload);
            /*
            fs.rename(
                __dirname + "/../uploads/" + params.location + "/" + params.filename,
                __dirname + "/../uploads/" + params.location + "/" + upload.filename,
                function (err) {
                    if (err) console.log("ERROR: " + err);
                }
            );
            */
        }
        res.redirect("/" + params.location);
    } catch (error) {
        log.Error("edit.Update\n" + error)
    }

}

router.get("/:location/:filename", function (req, res) {
    findfile(req.params.location, req.params.filename, req.params.location, res);
});

router.get("/*/: location /:filename", function (req, res) {
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
