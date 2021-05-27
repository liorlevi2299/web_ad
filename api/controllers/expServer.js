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
app.use(express.static("../web_ad/api/view"))
//console.log(window.location.path)
app.get("/", (req, res) => {
    res.sendFile("test.html", {root: '../web_ad/api/view'})

})
app.use(express.json({limit: '100mb'}))
app.use(express.json({limit: '100mb'}))
let anomalyDetect;
app.post("/learn", function (req, res) {
    anomalyDetect = new anomalyDetector(0.9);
    //anomalyDetect.isHybrid = req.query
    if (req.query.model_type==='hybrid'){
        anomalyDetect.isHybrid=true;
    }

    if(req.query.model_type==='regression') {
        anomalyDetect.isHybrid=false;
    }
    anomalyDetect.learnNormal(req.body)
    //res.write("The file was uploaded successfully!")
    //alert("the file was upload")
    res.json({
        status: "The file was uploaded successfully!"
    });
/*    while (true){
        if (anomalyDetect.status === true) {

        }
    }*/
    res.end()
})

app.post("/detect", function (req, res) {
   // console.log('detect body:')
    //console.log(req.body);
    res.write(JSON.stringify(anomalyDetect.detect(req.body)));
    // res.json(({x: anomalyDetect.detect(req.body)}));
    //console.log(JSON.stringify(anomalyDetect.detect(req.body)))
    res.end()
})
app.listen(8080)