const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../models/SearchInFile')
const bodyParser = require('body-parser')
const anomalyDetector = require("../models/anomaly detector/anomalyDetector");
// require csvtojson module



const app = express()
app.use(fileUpload())
app.use(bodyParser.urlencoded({
    extended: true
}))
app.use(bodyParser.json());
app.use(bodyParser.raw());
app.use(express.static("../view"))
//console.log(window.location.path)
app.get("/", (req, res) => {
    res.sendFile("test.html", {root: '../view'})

    //res.sendFile("C:\\Users\\azran\\WebstormProjects\\web_ad\\test.html")
})
var anomalyDetect = new anomalyDetector( 0.9);

app.post("/learn", function (req, res) {
    //anomalyDetect.isHybrid = req.query
    anomalyDetect.isHybrid = true;
    anomalyDetect.learnNormal(req.body)
    res.end()
})

app.post("/detect", function (req, res) {
    res.write(JSON.stringify(anomalyDetect.detect(req.body)));
    res.end()
})
app.listen(8080)
