var http = require('http');
var url = require('url');
var strdec = require('string_decoder').StringDecoder;
const { JSDOM } = require("jsdom");
const { window } = new JSDOM("");
const $ = require("jquery")(window);

function test() {
    var x = [];
    let myPromise = new Promise(function (myResolve) {
        // "Producing Code" (May take some time)
        $.ajax('http://127.0.0.1:8081/sign_up', {
            method: 'POST',
            data: JSON.stringify({
                'uname': "test01",
                'pwd': "test01",
                'clearence': "test01"
            }),
            headers: {
                'Content-Type': 'application/json'
            },
            success: function (resp, status) {
                //console.log("User " + JSON.parse(resp).uname + " registered");
                console.log('success');
                x.push(resp);
                myResolve("ok");
            }
        });
    });
    // "Consuming Code" (Must wait for a fulfilled Promise)
    myPromise.then(
        function (value) {
            console.log(x);
        });
    console.log(x);
}

test();
