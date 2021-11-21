var ftpd = require('./node_modules/ftpd/ftpd');
var server = ftpd.FtpServer.createServer("127.0.0.1", "./files/").listen(2121);
server.on("client:connected", function(socket) {
var username = null;
console.log("client connected: " + socket.remoteAddress);
socket.on("command:user", function(user, success, failure) {
if (user) {
username = user;
success();
} else failure();
});
socket.on("command:pass", function(pass, success, failure) {
if (pass) success(username);
else failure();
});
});
server.debugging = 4;
server.listen(5555);