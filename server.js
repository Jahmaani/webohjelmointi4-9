const express = require("express");
const bodyParser = require("body-parser");

const app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

var customerController = require('./customerController');


app.route("/Tyypit")
    .get(customerController.haeTyypit)

// app.route("/haeAsiakkaat").get(customerController.haeAsiakkaat);
app.route("/haeAsiakkaat").get(customerController.haeAsiakkaat);

app.route("/lisaa").post(customerController.lisaaAsiakas);

app.route("/poista/:id").delete(customerController.poistaAsiakas);


app.listen(3000, function () {
    console.log("Toimii portissa 3000!");
})