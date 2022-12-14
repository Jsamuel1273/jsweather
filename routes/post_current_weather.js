const express = require('express');
const Joi = require('joi');

const app = express()
// requiring ejs as template engine
const ejs = require("ejs");
// requring https for making request to api
const request = require('request');
// making ejs default view engine
app.set('view engine', 'ejs');
// requiring body-parser to access input from form
const bodyParser = require('body-parser');
// using body parser through express app
app.use(bodyParser.urlencoded({ extended: true }));
// using express router to creat a new route
const weatherRoute = new express.Router();
// requiring dotenv to store api key
require('dotenv').config();
// using api key from dotenv file
// using api key from dotenv file
const api = process.env.API_KEY;
const postRoute = new express.Router()
postRoute.post("/", (req, res) => {
    const query = req.body.city;

    const schema = Joi.object({
        city: Joi.string().required()
    })
    const { error } = schema.validate(req.body);

    if (error) {
        res.render("errors", { error: "400 Search value not provided" })
    }
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + api + "&units=metric"
    // making a request for
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            res.render("errors", { error: "There was an error reachng the server" })
        } else {
            if (response.statusCode == 404) {

                res.render("errors", { error: "City not found" })
            } else if (response.statusCode == 401) {
                res.render("errors", { error: "There was an error connecting to api" })
            }
            const temperature = response.body.main.temp;
            const maxTemperature = response.body.main.temp_max;
            const minTemperature = response.body.main.temp_min;
            const feels = response.body.main.feels_like;
            const icon = response.body.weather[0].icon;
            const city = response.body.name
            const country = response.body.sys.country
            const description = response.body.weather[0].description
            const humidity = response.body.main.humidity;
            res.render("home", { city: city, country: country, temperature: temperature, maxTemperature: maxTemperature, minTemperature: minTemperature, description: description, icon: icon, feels: feels, humidity: humidity})
        }
    })
})
module.exports = postRoute;

