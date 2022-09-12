var express = require("express");
var router = express.Router();

router.post("/", function (req, res) {
    /*
    if (req.session.open != undefined) {
        req.session.open = +req.body.nr;
    } else {
        req.session.open = 0;
    }

    console.log(req.session.open);*/
    //res.send();
    /*
    req.session.open = +req.body.nr;*/
});

module.exports = router;
