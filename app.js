const express = require("express")
const https = require("https")
const dotenv = require("dotenv");
const { response } = require("express");

dotenv.config()
const app = express();

const url = `https://api.openweathermap.org/data/2.5/weather?q=Oslo&appid=${process.env.API_KEY}`

app.get("/", function (req, res) {
    https.get(url, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            console.log(weatherData.weather[0].description)
        })
    })
    
})



app.listen(3000, function () {
    console.log("Server is running on port 3000")
})