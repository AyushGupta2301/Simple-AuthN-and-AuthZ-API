var cryptojs = require('crypto-js')


var cipher = cryptojs.AES.encrypt("message","secretkey123").toString();
var mess = cryptojs.AES.decrypt("U2FsdGVkX19lvVB5syA5JDeX+a1NXwtbLwhvW85EzTLBQxpRnxALsZuEi6WnMVdhvZLPbSErlpJvTQP7+fzeCtVvdOnG/WPXKKoO3IimvcDjOs+ub6TpTe/0offfrF7B","ayushsecret").toString(cryptojs.enc.Utf8);
var obj = JSON.parse(mess);
console.log(cipher);
console.log(obj.pwd);
