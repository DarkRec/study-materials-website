const express = require("express");
const { param } = require("../routes/edit");
const log = require("./logs");

//const pool = require('../src/db');
const Pool = require('pg').Pool;

const pool = new Pool({
    user: "darek",
    host: "localhost",
    database: "io",
    password: "plokplok02",
    port: 5432,
})


class Postgres {
    constructor() {
        pool.connect();
    }
    async findDir(coll, dir, location) {
        if (coll == dir) fullDir = dir + "/" + location;
        else fullDir = coll + "/" + dir + "/" + location;

        const search = `SELECT * FROM "${coll}" WHERE location LIKE '${fullDir}'`
        try {
            var result = await pool.query(search)
        } catch (err) {
            log.Error("postgres.findDir\n" + err)
        } finally {
            //log.Query(search)
            if (result != undefined)
                return (result.rows)
            else
                return ""
        }
    }

    async createTable(coll) {
        const text =
            `CREATE TABLE IF NOT EXISTS "${coll}" (
            "filename" VARCHAR(150) NOT NULL,
            "originalname" VARCHAR(165) NOT NULL,
            "location" VARCHAR(250) NOT NULL,
            "type" VARCHAR(10) NOT NULL,  
            "info" VARCHAR(250),
            "author" VARCHAR(45) DEFAULT 'guest',
            "studentsonly" BOOLEAN DEFAULT 'TRUE',
            PRIMARY KEY ("filename"));`;

        try {
            await pool.query(text)
        } catch (err) {
            log.Error("postgres.createTable\n" + err)
        } finally {
            log.Query(text)
        }
    }

    async listCollection(coll) {
        const search = `SELECT * FROM "${coll}" WHERE location LIKE '${coll}';`
        try {
            var result = await pool.query(search)
        } catch (err) {
            this.createTable(coll)
            log.Error("postgres.listCollection\n" + err)
        } finally {
            //log.Query(search)
            if (result != undefined)
                return (result.rows)
            else
                return ""
        }
    }

    async createDir(coll, newListing) {
        const insert = `INSERT INTO "${coll}" ("filename", "originalname", "location", "type") VALUES('${newListing.filename}', '${newListing.filename}', '${newListing.location}', 'folder');`
        try {
            await pool.query(insert)
        } catch (err) {
            log.Error("postgres.createDir\n" + err)
        } finally {
            log.Insert(insert, "folder", newListing.filename)
        }
    }

    async createListing(coll, newListing) {
        const insert = `INSERT INTO "${coll}" ("filename", "originalname", "location", "type", "info", "author", "studentsonly") VALUES('${newListing.filename}', '${newListing.originalname}', '${newListing.location}', 'file', '${newListing.info} ', '${newListing.author}', '${newListing.studentsonly}');`
        try {
            await pool.query(insert)
        } catch (err) {
            log.Error("postgres.createListing\n" + err)
        } finally {
            log.Insert(insert, "file", newListing.filename)
        }
    }

    async findFile(coll, name, location) {
        var dir;
        if (coll == location) dir = coll;
        else dir = coll + "/" + location;
        const search = `SELECT * FROM "${coll}" WHERE filename LIKE '${name}' AND location LIKE '${dir}';`

        try {
            var result = await pool.query(search)
        } catch (err) {
            log.Error("postgres.findFile\n" + err)
        } finally {
            //log.Query(search)
            if (result != undefined)
                return result.rows
        }
    }


    async updateFile(coll, params) {
        console.log("params")
        console.log(params);
        if (params.filename && params.info) {
            console.log("all")
        } else if (params.filename) {
            console.log("name")
        } else if (params.info) {
            console.log("info")
        }

        //const search = `UPDATE "${coll}" SET filename = '${params.filename}'WHERE filename LIKE '${}' AND location LIKE '${dir}';`
        /*
        dbo.collection(coll).updateOne({ filename: params.filename }, { $set: upload }, function (err, res) {
            if (err) throw err;
            db.close();
        });*/

        try {
            //await pool.query(update)
        }
        finally {

        }
    }

}


/*
const findDir(coll, dir, location) {
    if (coll == dir) fullDir = dir + "/" + location;
    else fullDir = coll + "/" + dir + "/" + location;

    //console.log(coll, dir, location);
    const db = await MongoClient.connect(this.url);
    const dbo = db.db("IO-database");
    const result = await dbo.collection(coll).find({ location: fullDir }).toArray();
    //console.log(result);
    return result;
}*/


/*

        const execute = async (query) => {
            try {
                await client.connect();     // gets connection
                await client.query(query);  // sends queries
                return true;
            } catch (error) {
                console.error(error.stack);
                return false;
            } finally {
                await client.end();         // closes connection
            }
        };
        
        execute(text).then(result => {
            if (result) {
                console.log('Table created');
            }
        });
*/

module.exports = new Postgres();
