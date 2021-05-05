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

/*router.patch('/:modelID', (req, res) => {
    const modelID = req.params.modelID
    res.status(200).json({
        message: `Hello World ${modelID}`
    })
})
router.delete('/model', (req, res) => {
    res.status(200).json({
        message: 'Hello World post'
    })
})*/
 module.exports = router;