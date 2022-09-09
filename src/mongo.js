/*require("dotenv").config();
console.log(process.env);
console.log(process.env.DB_URI);*/

const { MongoClient } = require("mongodb");

class MongoBot {
    constructor() {
        const url = "mongodb+srv://DaRek:Plokplok02@cluster0.yrs1qle.mongodb.net/test";
        this.client = new MongoClient(url);
    }
    async init() {
        await this.client.connect();
        console.log("connected");

        //this.db = this.client.db(conf.db);
        //this.Users = new Users(this.db);
    }
    async createListing(coll, newListing) {
        const result = await this.client.db("IO-database").collection(coll).insertOne(newListing);

        console.log(`New listing creted with the following id: ${result.insertedId}`);
    }
    async createColl(name) {
        //console.log(this.client.db("IO-database").collection(name));
        //await this.client.createCollection(name);
    }
}
/*
async function main() {
    const uri = "mongodb+srv://DaRek:Plokplok02@cluster0.yrs1qle.mongodb.net/test";
    const client = new MongoClient(uri);
}

main().catch(console.error);

async function createListing(client, newListing) {
    const result = await client.db("IO-database").collection("algebra").insertOne(newListing);

    console.log(`New listing creted with the following id: ${result.insertedId}`);
}

async function listDatabases(client) {
    databasesList = await client.db().admin().listDatabases();

    console.log("Databases:");
    databasesList.databases.forEach((db) => console.log(` - ${db.name}`));
}
*/

module.exports = new MongoBot();
//module.exports = { createListing, client };
