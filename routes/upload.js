var express = require("express");
var router = express.Router();
const multer = require("multer");
const fs = require("fs");
const postgres = require("../src/postgres");
//const mongo = require("../src/mongo");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/uploads/");
    },
    filename: function (req, file, cb) {
        var d = Date.now();
        //file.originalname = file.originalname.replace(/[^A-Za-z0-9\.-]/g, "-");
        cb(null, d + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/", upload.array("mutli-files"), function (req, res) {
    async function Add(coll, Listing) {
        await postgres.createListing(coll, Listing);
    }
    req.files.forEach((File) => {
        var oldPath = File.path;
        var dir = File.destination + req.body.url + "/";
        var newPath = dir + File.filename;
        if (!req.body.author) req.body.author = "guest";
        newListing = {
            filename: File.filename,
            originalname: File.originalname,
            author: req.body.author,
            info: req.body.info,
            studentsonly: req.body.studentsOnly == "on" ? true : false,
            location: req.body.url,
        };

        Add(req.body.url.split("/")[0], newListing);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            //console.log("new dir: " + dir);
        });
    });
    res.redirect("/" + req.body.url);
});

module.exports = router;
