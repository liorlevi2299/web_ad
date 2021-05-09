const http=require('http');
const fs=require('fs')
const model = require('../models/SearchInFile')
const anomalyDetector = require('../models/anomaly detector/anomalyDetector');


function displayFormCommand(req, res){
    fs.readFile('../View/test.html','utf8',(err,data)=>{
        if(err)
            console.log(err)
        else
            res.write(data)
        res.end()
    })
}

function searchTextCommand(req,res){
    console.log("After JSON Conversion");
    var result = model.searchText('hello', 'hello world\n good bye\n')
    res.write(result)
    res.end()
}

let commands = new Map()
commands.set('/',displayFormCommand)
commands.set('/search', searchTextCommand)



const server = http.createServer((req,res)=>{
    if(commands.has(req.url))
        commands.get(req.url)(req,res)
    else
        res.write("Invalid request")
})
server.listen(8080, ()=>console.log("server started on port 8080"))