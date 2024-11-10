"use strict";

const express = require("express");
const app = express();
const fs = require("fs");
const multer = require("multer");
const Database = require("better-sqlite3");

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

const db = new Database("./Assignment6.db");


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});

///////////////////////////////////////////////////////////////////////////
// ENDPOINTS //

app.get("/jokebook/categories", async function (req, res) {
    try {
        let qry = "SELECT DISTINCT(category) FROM JokeList;";
        let stmt = db.prepare(qry);
        let rows = stmt.all();
        res.json(rows);
    } catch (err) {
        res.type("text");
        res.status(500).send("Server Error: " + err);
    }
});

app.get("/jokebook/joke/:category", async function (req, res) {
    const category = req.params.category;
    try {
        let qry = "SELECT setup, delivery FROM JokeList WHERE category = ?;";
        let stmt = db.prepare(qry);
        let rows = stmt.all(`${category}`);
        res.json(rows);
    } catch (err) {
        res.type("text");
        res.status(500).send("Server Error: " + err);
    }
});

app.post("/jokebook/joke/new", async (req, res) => {
    const {category, setup, delivery}  = req.body;
    try {
        let query = "INSERT INTO JokeList (category, setup, delivery) VALUES (?, ?, ?);";
        let stmt = db.prepare(query);
        let result = stmt.run(category, setup, delivery);
        if (result.changes === 1) {
            res.type("text"); res.send("successfully inserted into table");
        }
    } catch (err) {
        res.status(500).send("Server Error: " + err);
    }
});