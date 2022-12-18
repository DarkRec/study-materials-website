var fs = require("fs");

class Logs {
    Error(error) {
        fs.writeFile("./logs/errors/" + new Date().toLocaleString("en-GB", { timeZone: "Europe/Warsaw" }).replace(/, /g, '_').replace(/\//g, '-') + ".log", error, function (err) {
            if (err) throw err;
        });
    }
    Query(sql) {
        fs.writeFile("./logs/sql/" + new Date().toLocaleString("en-GB", { timeZone: "Europe/Warsaw" }).replace(/, /g, '_').replace(/\//g, '-') + ".log", sql, function (err) {
            if (err) throw err;
        });
    }
    Insert(sql, type, name) {
        var date = new Date().toLocaleString("en-GB", { timeZone: "Europe/Warsaw" }).replace(/, /g, '_').replace(/\//g, '-')
        var path = "./logs/sql/" + date.substring(0, 10)
        var hour = date.substring(11, 19)
        if (fs.existsSync(path)) {
            fs.writeFile(path + ".log", `${hour} | ${type} - ${name}\n${sql}`, function (err) {
                if (err) throw err;
            });
        } else {
            fs.appendFile(path + ".log", `\n${hour} | ${type} - ${name}\n${sql}`, function (err) {
                if (err) throw err;
            });
        }
    }
}
module.exports = new Logs();
