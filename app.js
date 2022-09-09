var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var favicon = require("serve-favicon");
var hbs = require("hbs");
const multer = require("multer");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var semesterRouter = require("./routes/semester");
var subjectRouter = require("./routes/subject");
var uploadRouter = require("./routes/upload");

var app = express();

const PORT = 8000;
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

const upload = multer({ dest: "uploads/" });

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");
hbs.registerPartials(__dirname + "/views/partials");
hbs.registerHelper("incremented", function (index) {
    index++;
    return index;
});
hbs.registerHelper("link", function (index) {
    index = index.toLowerCase();
    index = index.replace(/\s/g, "-");
    return index;
});

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//app.use("/", semesterRouter);
app.use("/", subjectRouter);
app.use("/upload", uploadRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

module.exports = app;
