"use strict";


(function () {
    window.addEventListener("load", init);
    function init() {
        
        let searchButton = id("searchButton");
        let searchBar = id("searchBar");
        searchButton.addEventListener("click", function(e) {
            goToCategory(searchBar.value);
        });
        
        let newButton = id("new-joke-btn");
        newButton.addEventListener("click", function () {
            id("popup").style.display = "block";
        });

        let saveButton = id("createJoke");
        saveButton.addEventListener("click", function (e) {
            e.preventDefault();
            submitForm();
        });

        let categories = document.getElementsByClassName("categories");
        let catA = Array.from(categories);
        catA.forEach(cat => {
            cat.addEventListener("click", function(e) {
                e.preventDefault();
                goToCategory(cat.name);
            });
        });
    }


    function submitForm() {
        console.log("fetch method");
        let params = new FormData(id("form-container")); // pass in entire form tag
        let jsonBody = JSON.stringify(Object.fromEntries(params)); //make form data json string.
        try {
            fetch("http://localhost:3000/jokebook/joke/new", {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json",
                },
                body: jsonBody,
            })
                .then(checkStatus)
                .then(goToCategory(params.get("category")))
                .catch(alert);
            console.log("fetch complete.");
        } catch (err) {
            res.type("text");
            res.status(500).send("Server Error: " + err);
        }
    }
    function checkStatus(response) {
        if (!response.ok) {
            throw Error("Error in request: " + response.statusText);
        }
        return response;
    }


    function goToCategory(category) {
        location.assign("http://localhost:3000/jokebook/joke/" + category);
    }
    function id(idName) {
        return document.getElementById(idName);
    }
})();