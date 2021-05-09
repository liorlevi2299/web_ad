/*const mongoose = require('mongoose');

const modelScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //name: {type: String},
    model_type: { type: String, required: true},
    //status: {type: String}
    //upload_time: {type: }
});

module.exports= mongoose.model('model', modelScheme);*/
const List = require("collections/list");

const mongoose = require('mongoose');


const modelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //timeStamp : .Timestamp,
    query_type: { type: String},
    status: { type: String },
    //list: {type: List},
});

module.exports = mongoose.model('model', modelSchema);

/*
const objectListModel = {
    feature: '',
    featureCorr: '',
    corrVal: '',
    threshold: '',
    AD_type: ''
}*/
