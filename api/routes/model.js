const express = require('express')
const router = express.Router();
const {
    get,
    postModel,
    //deleteModel,
    //getModelsState,
    //getAnomaly,
} = require('../controllers/model');


router.get('/', get);
router.post('/detect',postModel);
router.delete('/model',deleteModel);
router.get('/models',getModelsState);
router.get('/anomaly',getAnomaly);

module.exports = router;