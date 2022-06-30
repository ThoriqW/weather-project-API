const express = require("express");
const https = require("https")
const bodyParser = require("body-parser");

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function (req, res) {

    const query = req.body.cityName
    const apiKey = "c0538aba037cdb9532019b7a3ce73912"
    const units = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + units + "#"

    https.get(url, function (respone) {
        console.log(respone.statusCode);

        respone.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const weatherDesc = weatherData.weather[0].description;
            const temp = weatherData.main.temp;
            const city = weatherData.name;
            const icon = weatherData.weather[0].icon
            const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`

            res.write(`<h1>The tempraure in ${city} is ${temp} degrees celcius</h1>`)
            res.write(`<p>The weather is currently ${weatherDesc}</p>`)
            res.write("<img src=" + iconURL + ">")
            res.send()
        })
    })

})

app.listen(port, function () {
    console.log("Server is running on port " + port);
})