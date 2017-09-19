var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var jf = require('jsonfile'); //jsonfile module
var fs = require('fs'); //require file system

app.get('/listNews', function (req, res) {
  fs.readFile(__dirname + "/" + "news.json", 'utf8', function (err, data) {
    res.end(data);
  });
})

app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.sockets.on('connection', function (socket) {
  fs.watch("news.json", function (event, fileName) {
    jf.readFile('news.json', function (err, data) {
      var data = data;
      socket.volatile.emit('notification', data);
    });
  });
});

app.use('/static', express.static('node_modules'));

server.listen(4206);