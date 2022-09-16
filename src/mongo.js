const MongoClient = require("mongodb").MongoClient;
var fs = require("fs");

class MongoBot {
    constructor() {
        this.url = "mongodb+srv://DaRek:Plokplok02@cluster0.yrs1qle.mongodb.net/test";
    }
    async createListing(coll, newListing) {
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        const result = await dbo.collection(coll).insertOne(newListing);
        console.log(`New listing creted with the following id: ${result.insertedId}`);
    }

    async createColl(name) {
        //console.log(this.client.db("IO-database").collection(name));
        //await this.client.createCollection(name);
    }
    async listCollection(coll) {
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        const result = await dbo.collection(coll).find({ location: coll }).toArray();
        return result;
    }

    async findFile(coll, name, location) {
        var dir;
        if (coll == location) dir = coll;
        else dir = coll + "/" + location;
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        const result = await dbo.collection(coll).find({ filename: name, location: dir }).toArray();
        return result;
    }

    async listDatabases() {
        const db = await MongoClient.connect(this.url);
        databasesList = await db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    }

    async updateFile(coll, body, params) {
        console.log(coll);
        console.log(body);
        console.log(params);
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        var d = Date.now();
        body.filename = body.filename.replace(/[^A-Za-z0-9\.-]/g, "-");
        var upload;
        if (body.filename == "" && body.info != "") upload = { info: body.info };
        else if (body.filename != "" && body.info == "") {
            if (body.filename.split(".").length == 1) body.filename = body.filename + "." + body.prevName.split(".")[body.prevName.split(".").length - 1];
            upload = { originalname: body.filename, filename: d + "-" + body.filename };
        } else if (body.filename != "" && body.info != "") {
            if (body.filename.split(".").length == 1) body.filename = body.filename + "." + body.prevName.split(".")[body.prevName.split(".").length - 1];
            upload = { originalname: body.filename, filename: d + "-" + body.filename, info: body.info };
        }
        if (upload) {
            dbo.collection(coll).updateOne({ filename: params.filename }, { $set: upload }, function (err, res) {
                if (err) throw err;
                db.close();
            });
            fs.rename(
                __dirname + "/../uploads/" + params.location + "/" + params.filename,
                __dirname + "/../uploads/" + params.location + "/" + upload.filename,
                function (err) {
                    if (err) console.log("ERROR: " + err);
                }
            );
        }
    }
    async findDir(coll, dir, location) {
        if (coll == dir) fullDir = dir + "/" + location;
        else fullDir = coll + "/" + dir + "/" + location;

        //console.log(coll, dir, location);
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        const result = await dbo.collection(coll).find({ location: fullDir }).toArray();
        //console.log(result);
        return result;
    }
}

module.exports = new MongoBot();
