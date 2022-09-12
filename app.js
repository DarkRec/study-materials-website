var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
//var logger = require("morgan");
var favicon = require("serve-favicon");
var hbs = require("hbs");
var session = require("express-session");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var semesterRouter = require("./routes/semester");
var subjectRouter = require("./routes/subject");
var uploadRouter = require("./routes/upload");
var downloadRouter = require("./routes/download");
var fileinfoRouter = require("./routes/fileinfo");
var openRouter = require("./routes/open");

var app = express();

const PORT = 1000;
app.listen(PORT, function () {
    console.log("start serwera na porcie " + PORT);
});
app.use(favicon(path.join(__dirname, "public", "favicon.ico")));

//app.set("trust proxy", 1); // trust first proxy
app.use(
    session({
        name: "Active",
        secret: "SelectedSemester",
        resave: false,
        saveUninitialized: true,
        cookie: {
            maxAge: 1000 * 60 * 60,
        },
    })
);
/*app.use(
    session({
        secret: "cookie_secret",
        resave: true,
        saveUninitialized: true,
    })
);*/
//app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

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
hbs.registerHelper("extension", function (index) {
    icons = [
        "accdb",
        "bmp",
        "c",
        "cpp",
        "cs",
        "css",
        "doc",
        "exe",
        "gif",
        "html",
        "java",
        "jpg",
        "js",
        "mov",
        "mp3",
        "png",
        "pptx",
        "psd",
        "py",
        "rar",
        "sql",
        "svg",
        "txt",
        "xls",
        "xml",
        "pdf",
        "zip",
    ];
    index = index.split(".")[index.split(".").length - 1];
    var ext;
    icons.forEach((element) => {
        if (element == index) ext = index;
    });
    if (ext) return ext;
    return "other";
});

//app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
//app.use("/", semesterRouter);
app.use("/", subjectRouter);
app.use("/upload", uploadRouter);
app.use("/download", downloadRouter);
app.use("/setOpen", openRouter);

var subjects = [
    "/algebra",
    "/analiza-matematyczna-1",
    "/chemia",
    "/fizyka-1",
    "/podstawy-informatyki",
    "/podstawy-programowania",
    "/prawo-patentowe",
    "/algorytmy-i-struktury-danych-1",
    "/analiza-Matematyczna-2",
    "/architektury-komputerów",
    "/fizyka-2",
    "/programowanie-obiektowe",
    "/systemy-operacyjne",
    "/algorytmy-i-struktury-danych-2",
    "/nowoczesne-materiały",
    "/podstawy-baz-danych",
    "/projektowanie-oprogramowania",
    "/równania-różniczkowe-i-rachunek-wariacyjny",
    "/sieci-komputerowe-i-administracja-systemów",
];
app.use(subjects, fileinfoRouter);

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
