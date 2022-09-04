var express = require("express");
var router = express.Router();

router.get("/:sem", function (req, res, next) {
    console.log(req.params.sem);
    res.send("respond with a resource");
});

module.exports = router;
