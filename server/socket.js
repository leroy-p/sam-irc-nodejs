const s = require('socket.io');
const ent = require('ent');

var setSockets = function(server) {
  var io = s.listen(server);
  io.sockets.on('connection', function (socket) {
    socket.on('join', function(data) {
      socket.join(data.username);
      socket.broadcast.emit('new_client', data);
    });

    socket.on('message', function(data) {
      data.message = ent.encode(data.message);
      socket.broadcast.emit('message', data);
    });

  });
};

exports.setSockets = setSockets;
