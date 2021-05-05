const express = require('express')
const router = express.Router();
const {
    getModel,
    postModel,
    deleteModel,
    getModelsState,
    getAnomaly,
} = require('../controllers/model');


router.get('/model', getModel);
router.post('/model',postModel);
router.delete('/model',deleteModel);
router.get('/models',getModelsState);
router.get('/anomaly',getAnomaly);


 module.exports = router;