const express = require('express');
const app = express()
// requiring ejs as template engine
const ejs = require("ejs");
// making ejs default view engine
app.set('view engine', 'ejs');
// requring weather route module
const weatherRoute = require("./routes/get");
const postRoute = require("./routes/post_current_weather")
const forecastRoute = require("./routes/get_forecast")
const postforecast = require("./routes/post_forecast")
// requiring dotenv to store api key
require('dotenv').config();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
// using express app to use the weather route for post request
app.use(weatherRoute)
app.use(postRoute);
app.use(forecastRoute)
app.use(postforecast)
// error page
app.get('*', (req, res)=>{
  res.send("The page you are trying to access does not exist")
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log("server is running")
})