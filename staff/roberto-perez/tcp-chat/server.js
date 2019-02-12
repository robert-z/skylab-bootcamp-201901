const net = require('net');

const port = 8095;

const server = net.createServer(socket => {
    socket.on('data', data => {
        console.log(data.toString());
        socket.end('OK');
    })
});

server.listen(port, function() {
  console.log('server bound');
});