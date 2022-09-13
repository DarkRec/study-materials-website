var express = require("express");
var router = express.Router();

router.get("/", function (req, res) {
    console.log(req.originalUrl);
});

router.get("/:id", function (req, res) {
    console.log(req.originalUrl);
});

module.exports = router;
