const express = require("express")
const https = require("https")
const dotenv = require("dotenv");
const { response } = require("express");
const bodyParser = require("body-parser")

dotenv.config()
const app = express();

app.use(bodyParser.urlencoded({extended: true}))
const unit = "metric"



app.get("/", function (req, res) {
    console.log("This is working!")
    res.sendFile(__dirname + "/index.html")
})

app.post("/", function (req, res) {
    const city = req.body.cityName
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.API_KEY}&units=${unit}`

    https.get(url, function (response) {
        console.log(response.statusCode)

        response.on("data", function (data) {
            const weatherData = JSON.parse(data)
            const weatherDescription = weatherData.weather[0].description
            const icon = weatherData.weather[0].icon
            const imageURL = `http://openweathermap.org/img/w/${icon}.png`
            res.write(`<p> The temperature in ${city} is: ${weatherData.main.temp} degrees! </p> `)
            res.write(`<img src="${imageURL}">`)
            res.send()
        }) 
    })
    console.log(req.body.cityName)
})



app.listen(3000, function () {
    console.log("Server is running on port 3000")
})