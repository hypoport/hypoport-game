var express = require('express');

var wwwFolder = "/www";
var port = Number(process.env.PORT || 8080);

var app = express();
app.use(express.static(__dirname + wwwFolder));
app.listen(port);

console.log('Serving static from : ' + wwwFolder);
console.log('Listening on port   : ' + port);
