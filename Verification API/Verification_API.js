var http = require('http')
var url = require('url')
var util = require('util')
var cryptojs = require('crypto-js')
var strdec = require('string_decoder').StringDecoder
var mongo = require('mongodb')
var mongoclient = mongo.MongoClient
let URI = "mongodb+srv://admin:1357@cluster0.qbbwc.mongodb.net/Auth?retryWrites=true&w=majority"

class User {
    constructor(a, b, c) {
        this.naam = a;
        this.guptshabdh = b;
        this.anumati = c;
    }
}

class Token {
    constructor(a,b) {
        this.uname = a;
        this.clearence = b;
    }
}


function sign_up(req, res) {
    let decoder = new strdec('utf-8');
    let buffer = "";
    req.on("data", function (chunk) {
        buffer += decoder.write(chunk);
    })
    req.on("end", function () {
        buffer += decoder.end();
        var requserobj = JSON.parse(buffer);
        var userobj = new User(requserobj.uname, requserobj.pwd, requserobj.clearence);
        mongoclient.connect(URI, function (err, database) {
            if (err) throw err;
            let dbobj = database.db("Auth");
            console.log("connected to database for addition");
            dbobj.collection("userlist").insertOne(userobj, function (err, resp) {
                if (err) throw err;
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
        var userobj1 = JSON.parse(buffer);
        mongoclient.connect(URI, function (err, database) {
            if (err) throw err;
            let dbobj = database.db("Auth");
            console.log("connected to database to find");
            var query = { naam: userobj1.uname, guptshabdh:userobj1.pwd}
            // console.log(userobj1.pwd);
            dbobj.collection("userlist").findOne(query, function (err, resp) {
                if (err) throw err;
                if (resp) {
                        res.writeHead(200, "OK", { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' });
                        var token = {'uname':resp.naam, 'pwd':resp.guptshabdh, 'clearence':resp.anumati};
                        let enctoken = cryptojs.AES.encrypt(JSON.stringify(token),"ayushsecret").toString();
                        res.write(JSON.stringify(enctoken));
                        console.log('found user')
                        console.log(token);
                        res.end();
                }
                else {
                    res.writeHead(401, "UNAUTHORIZED", {'Access-Control-Allow-Origin': '*' });
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
    else if (req.method == "GET") {
        // for checking connectivity
        res.write("Endpoint hit, Request Acknowledged");
        res.end();
    }
    else {
        let pathobj = url.parse(req.url, true);
        switch (pathobj.pathname) {
            case "/sign_up":
                sign_up(req, res);
                break;
            case "/sign_in":
                sign_in(req, res);
                break;
        }
    }
}).listen(8081, "192.168.1.5");
