var http = require('http')
var url = require('url')
var util = require('util')
var strdec = require('string_decoder').StringDecoder
var mongo = require('mongodb')
var mongoclient = mongo.MongoClient
let URI = "mongodb+srv://admin:1357@cluster0.qbbwc.mongodb.net/Auth?retryWrites=true&w=majority"


function sign_up(req, res) {
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    })
    req.on("end", function () {
        buffer += decoder.end();
        var userobj = JSON.parse(buffer);
        mongoclient.connect(URI, function (err, database) {
            if (err) throw err;
            let dbobj = database.db("Auth");
            console.log("connected to database for addition");
            dbobj.collection("userlist").insertOne(userobj,function(err,resp){
                if(err) throw err;
                console.log(resp);
            })

        })
        res.writeHead(200, "OK", { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
        res.write(JSON.stringify(buffer));
        res.end();
    })
}


function sign_in(req, res) {
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    })
    req.on("end", function () {
        buffer += decoder.end();
        var userobj = JSON.parse(buffer);
        mongoclient.connect(URI, function (err, database) {
            if (err) throw err;
            let dbobj = database.db("Auth");
            console.log("connected to database to find");
            var query = {uname : userobj.uname}
            dbobj.collection("userlist").findOne(query,function(err,resp){
                if(err) throw err;
                if(resp){
                    res.writeHead(200, "OK", { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                    res.write(JSON.stringify(buffer));
                    console.log(resp);
                    res.end();
                }
                else{
                    res.writeHead(401, "UNAUTHORIZED");
                    res.write('user not found');
                    console.log('User not Found');
                    res.end();
                }
                
            })
        })
    })
}

http.createServer(function (req, res) {
    if (req.method == "OPTIONS") {
        res.writeHead(200, "OK", { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': '*', 'Access-Control-Allow-Methods': '*' });
        res.end();
    }
    else {
        let pathobj = url.parse(req.url, true);
        switch(pathobj.pathname) {
            case "/sign_up":
                sign_up(req,res);
                break;
            case "/sign_in":
                sign_in(req,res);
                break;
        }
    }
}).listen(8080, "localhost");
