"use strict";
const Database = require("better-sqlite3");
const db = new Database("./Assignment6.db");

function getCategories() {
    let qry = "SELECT DISTINCT(category) FROM JokeList;";
    let data = db.prepare(qry).all();
    return data;
}

function getRandomJoke() {
    console.log("getRandomJoke");
    let qry = "SELECT setup, delivery FROM JokeList ORDER BY RANDOM() LIMIT 1;";
    let data = db.prepare(qry).get();
    return data;
}

function getJokesByCategory(category) {
    let qry = "SELECT setup, delivery FROM JokeList WHERE category = ?;";
    let data = db.prepare(qry).all(category);
    return data;
}

function addNewJoke(category, setup, delivery) {
    let query = "INSERT INTO JokeList (category, setup, delivery) VALUES (?, ?, ?);";
    let stmt = db.prepare(query);
    let result = stmt.run(category, setup, delivery);
    if (result.changes === 1) {
        res.type("text"); res.send("successfully inserted into table");
    } else {
        res.type("text"); res.send("POST was unsuccessful");
    }
}

module.exports = {
    getCategories,
    getRandomJoke,
    getJokesByCategory,
    addNewJoke
};