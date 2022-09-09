var express = require("express");
var router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const mongo = require("../src/mongo");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        console.log(file);
        var d = Date.now();
        file.originalname;
        file.originalname = file.originalname.replace(/[^A-Za-z0-9\.-]/g, "-");
        cb(null, d + "-" + file.originalname);
    },
});
const upload = multer({ storage: storage });

router.post("/", upload.array("mutli-files"), function (req, res) {
    // req.file is the name of your file in the form above, here 'uploaded_file'
    // req.body will hold the text fields, if there were any

    //console.log(req.file);
    //console.log(req.body);

    async function start() {
        await mongo.init();
    }
    start();
    async function Add(coll, Listing) {
        await mongo.createListing(coll, Listing);
    }
    req.files.forEach((File) => {
        var oldPath = File.path;
        var dir = File.destination + req.body.url + "/";
        var newPath = dir + File.filename;

        console.log(dir);
        console.log(req.body.url);
        console.log(File);
        console.log(req.body);
        newListing = {
            filename: File.filename,
            originalname: File.originalname,
            mimetype: File.mimetype,
            size: File.size,
            author: req.body.author,
            info: req.body.info,
            studentsonly: req.body.studentsOnly == "on" ? true : false,
        };

        mongo.createColl(req.body.url);

        Add(req.body.url, newListing);
        if (!fs.existsSync(dir)) fs.mkdirSync(dir);
        fs.rename(oldPath, newPath, function (err) {
            if (err) throw err;
            console.log("new dir: " + dir);
        });
    });
    res.redirect("/" + req.body.url);
});

//router.post("/upload-multiple", upload.array("files", 5), uploadController.uploadMultiple);

/*
router.post("/", upload.none(), function (req, res, next) {
    // req.body contains the text fields
});*/

module.exports = router;
