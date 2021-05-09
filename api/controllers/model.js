const Model = require('../models/model');
const mongoose = require("mongoose");
const MongoDB = require('mongodb');

module.exports = {
    getModel: (req, res) => {
        res.status(200).json({
            message: 'Hello World getModel'
        })
    },
/*    postModel:(req, res) => {
        res.status(200).json({
            message: 'Hello World postModel'
        })
    },*/
    postModel:(req, res) => {
        //const {title, description, content} = req.body;
        const model = new Model({
            _id: new mongoose.Types.ObjectId(),
            //timeStamp: new mongoose.Types.ObjectId().getTimestamp(),
            query_type: req.query.model_type,
            status: "pending",
        });
        model.save()
            .then(()=>{
            res.status(200).json({
                message: 'Created model'
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    deleteModel:(req, res) => {
        res.status(200).json({
            message: 'Hello World deleteModel'
        })
    },
    getModelsState:(req, res) => {
        Model.find().then((models)=> {
            res.status(200).json({
                models
            })
        }).catch(error => {
            res.status(500).json({
                error
            })
        });
    },
    getAnomaly:(req, res) => {
        res.status(200).json({
            message: 'Hello World getAnomaly'
        })
    }
}