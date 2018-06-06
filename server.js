var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
  socket.on('connect', message => {
    io.emit('message', `${message.user} has connected.`)
  })
  socket.on('message', message => {
    io.emit('message', message);
  });
  socket.on('disconnect', message => {
    io.emit('message', `${message.user} has disconnected.`);
  });
});

http.listen(3000, function() {
  console.log('listening on *:3000');
});
