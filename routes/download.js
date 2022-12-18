var express = require("express");
var router = express.Router();

router.get("/:location/:name", function (req, res) {
    const file = `${__dirname}/../public/uploads/${req.params.location}/${req.params.name}`;
    downloadName = req.params.name.replace(req.params.name.split("-")[0], "").substring(1);
    res.download(file, downloadName);
});

router.get("/*/:location/:name", function (req, res) {
    const file = `${__dirname}/../public/uploads/${req.params[0]}/${req.params.location}/${req.params.name}`;
    downloadName = req.params.name.replace(req.params.name.split("-")[0], "").substring(1);
    res.download(file, downloadName);
});

module.exports = router;
