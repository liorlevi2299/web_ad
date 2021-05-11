const express = require('express')
const fileUpload = require('express-fileupload')
const model = require('../models/SearchInFile')
const bodyParser = require('body-parser')
const anomalyDetector = require("../models/anomaly detector/anomalyDetector");
const app = express()

app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// require csvtojson module



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

})
var anomalyDetect = new anomalyDetector(0.9);
app.use(express.json({limit: '100mb'}))
app.post("/learn?model_type=hybrid", function (req, res) {
    //anomalyDetect.isHybrid = req.query
    anomalyDetect.isHybrid = true;
    anomalyDetect.learnNormal(req.body)
    res.write("The file was uploaded successfully!")
    res.end()
})

app.use(express.json({limit: '100mb'}))
app.post("/learn?model_type=regression", function (req, res) {
    //anomalyDetect.isHybrid = req.query
    anomalyDetect.isHybrid = false;
    console.log('learn body:')
    console.log(req.body);
    anomalyDetect.learnNormal(req.body)
    res.write("The file was uploaded successfully!")
    res.json({
        status: "The file was uploaded successfully!"
    });
    res.end()
})

app.post("/detect", function (req, res) {
    console.log('detect body:')
    console.log(req.body);
    res.write(JSON.stringify(anomalyDetect.detect(req.body)));
    res.end()
})
app.listen(8080)