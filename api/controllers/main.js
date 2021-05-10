/*const express = require('express');
const anomalyDetector = require('../models/anomaly detector/anomalyDetector');
const api = express();

var anomaly = new anomalyDetector(true, 0.1);

const fs = require('fs')
try {
    const jsonString = fs.readFileSync('./aa.json')
    const customer = JSON.parse(jsonString)
} catch(err) {
    console.log(err)
    return
}

anomaly.learnNormal(jsonString);*/
