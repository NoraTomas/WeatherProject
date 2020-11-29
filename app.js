const express = require("express")
const https = require("https")
const dotenv = require("dotenv");
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
    res.set({ 'content-type': 'charset=utf-8' });

    https.get(url, function (response) {
        console.log(response.statusCode)

        if(response.statusCode == "404"){
            res.write(`<h1>Sorry, the city you entered does not exist! </h1>`)
            res.send()
        }

        if(response.statusCode == "200"){
            response.on("data", function (data) {
                const weatherData = JSON.parse(data)
                const icon = weatherData.weather[0].icon
                const imageURL = `http://openweathermap.org/img/w/${icon}.png`
                res.set({ 'content-type': 'charset=utf-8' });
                res.write(`<head> <meta charset="utf-8"> </head> `)
                res.write(`<p> The temperature in ${city} is: ${weatherData.main.temp} degrees! </p> `)
                res.write(`<img src="${imageURL}">`)
                res.send()
                
            }) 
        }
    })
    console.log("The city name is: " + req.body.cityName)
})



app.listen(3000, function () {
    console.log("Server is running on port 3000")
})