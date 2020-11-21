const express = require("express")
const https = require("https")
const dotenv = require("dotenv")

dotenv.config()
const app = express();

app.get("/", function (req, res) {
    https.get()

    res.send("Server is up and running")
})



app.listen(3000, function () {
    console.log("Server is running on port 3000")
})