const express = require('express');
const app = express();
const modelRoutes = require('./api/routes/model');
const mongoose = require("mongoose");
const bosyParser = require('body-parser');


app.use(bosyParser.json());
mongoose.connect(`mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@db-api.256lx.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true

});

mongoose.connection.on ('connected', ()=> {
    console.log('MongoDB Connected');
});

app.use('/api',modelRoutes);

/*app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));*/

app.use((req,res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === "OPTIONS") {
        res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
        return res.status(200).json({});
    }
    next();
});
app.get('/', (req, res) => {
    res.status(200).json({
        message: 'Hello World 4'
    })
});

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
})

app.use((error,req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})


module.exports = app;