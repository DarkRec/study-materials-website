const MongoClient = require("mongodb").MongoClient;

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
        const result = await dbo.collection(coll).find({}).toArray();
        return result;
    }

    async findFile(coll, name) {
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        const result = await dbo.collection(coll).find({ filename: name }).toArray();
        return result;
    }

    async listDatabases() {
        const db = await MongoClient.connect(this.url);
        databasesList = await db().admin().listDatabases();

        console.log("Databases:");
        databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
    }

    async updateFile(body, params) {
        const db = await MongoClient.connect(this.url);
        const dbo = db.db("IO-database");
        var d = Date.now();
        body.filename = body.filename.replace(/[^A-Za-z0-9\.-]/g, "-");
        dbo.collection(params.location).updateOne(
            { filename: params.filename },
            { $set: { originalname: body.filename, filename: d + "-" + body.filename, info: body.info } },
            function (err, res) {
                if (err) throw err;
                //console.log("1 document updated");
                db.close();
            }
        );
        //return d + "-" + body.filename;
    }
}

module.exports = new MongoBot();
