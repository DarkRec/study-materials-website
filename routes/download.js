var express = require("express");
var router = express.Router();

router.get("/:location/:name", function (req, res) {
    console.log(req.params);
    const file = `${__dirname}/../uploads/${req.params.location}/${req.params.name}`;
    console.log(file);
    downloadName = req.params.name.replace(req.params.name.split("-")[0], "").substring(1);
    res.download(file, downloadName); // Set disposition and send it.
});

router.get("/*/:location/:name", function (req, res) {
    console.log(req.params[0]);
    const file = `${__dirname}/../uploads/${req.params[0]}/${req.params.location}/${req.params.name}`;
    downloadName = req.params.name.replace(req.params.name.split("-")[0], "").substring(1);
    res.download(file, downloadName); // Set disposition and send it.
});

module.exports = router;
