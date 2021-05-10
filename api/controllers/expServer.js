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

    res.sendFile("C:\\Users\\azran\\WebstormProjects\\web_ad\\test.html")
})
var anomalyDetect = new anomalyDetector(true, 0.9);

app.post("/learn", function (req, res) {

    //res.write('searching for ' + req.body.key+ +':\n')
    //let key = req.body.key

    anomalyDetect.learnNormal(req.body)

/*    if(req.files) {
        let file = req.files.text_file
        var anomalyDetect = new anomalyDetector(true, 0.9);
        console.log("after anomal")
        anomalyDetect.learnNormal(JSON.parse(file.data))
        console.log(req.body)
        //let result = model.searchText(key, file.data.toString())
        res.write(file.data)
    }*/
    res.end()
})
app.listen(8080)
