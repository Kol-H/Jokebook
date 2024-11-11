"use strict";

const express = require("express");
const app = express();
const multer = require("multer");
const Database = require("better-sqlite3");
const jokesController = require("./controllers/jokes.controller");

console.log("Directory: " + __dirname);

app.use(multer().none());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

const db = new Database("./Assignment6.db");
const controller = require("./controllers/jokes.controller");

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");


const PORT = process.env.PORT || 3000;
app.listen(PORT, function () {
    console.log("Server listening on port: " + PORT + "!");
});

app.use("/jokebook", jokesController);
app.get("/", (req, res) => {
    res.redirect("/jokebook/home");
});

process.on("SIGINT", cleanUp);
function cleanUp() {
    console.log("Terminate signal received.");
    console.log("...Closing database connection.")
    db.close();
    console.log("...Closing HTTP server.");
    server.close(() => {
        console.log("...HTTP server closed.")
    })
}