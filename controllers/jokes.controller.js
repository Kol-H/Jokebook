"use strict";
const express = require("express");
const router = express.Router();

const model = require("../models/jokes.model");

//Index
router.get("/home", async function (req, res) {
    try {
        let randomJoke = model.getRandomJoke();
        let categoriesList = model.getCategories();
        res.render("index", {categoriesList : categoriesList, randomJoke: randomJoke, title:"Jokes - Home"})
    } catch (err) {
        res.type("text");
        res.status(500).send("Server Error: " + err);
    }
});

//Jokes by category
router.get("/joke/:category", async function (req, res) {
    const category = req.params.category;
    try {
        //let qry = "SELECT setup, delivery FROM JokeList WHERE category = ?;";
        //let jokesList = db.prepare(qry).all(category);
        console.log("getJokes");
        let jokesList = model.getJokesByCategory(category);
        res.render("jokes", {jokesList: jokesList, category: category, title: "Jokes - " + category})
    } catch (err) {
        res.type("text");
        res.status(500).send("Server Error: " + err);
    }
});

//POST new joke
router.post("/joke/new", async (req, res) => {
    const {category, setup, delivery}  = req.body;
    try {
        model.addNewJoke(category, setup, delivery);
        //res.redirect("/jokebook/joke/" + category);
        res.render("jokes", {title:"Jokes"});
    } catch (err) {
        res.status(500).send("Server Error: " + err);
    }
});

module.exports = router;