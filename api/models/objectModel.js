/*const mongoose = require('mongoose');

const modelScheme = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    //name: {type: String},
    model_type: { type: String, required: true},
    //status: {type: String}
    //upload_time: {type: }
});

module.exports= mongoose.model('model', modelScheme);*/
const mongoose = require('mongoose');
var List = require("collections/list");

const modelSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    timeStamp : _id.getTimestamp(),
    type_type: { type: String, required: true },
    status: { type: String },
    var: {listCol: new List([])},
});


module.exports = mongoose.model('Model', modelSchema);