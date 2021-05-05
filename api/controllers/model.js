module.exports = {
    getModel: (req, res) => {
        res.status(200).json({
            message: 'Hello World getModel'
        })
    },
    postModel:(req, res) => {
        res.status(200).json({
            message: 'Hello World postModel'
        })
    },
    deleteModel:(req, res) => {
        res.status(200).json({
            message: 'Hello World deleteModel'
        })
    },
    getModelsState:(req, res) => {
        res.status(200).json({
            message: 'Hello World getModelsState'
        })
    },
    getAnomaly:(req, res) => {
        res.status(200).json({
            message: 'Hello World getAnomaly'
        })
    }
}