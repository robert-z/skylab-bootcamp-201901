const net = require('net');

const { argv: [ , , ip, port, from, message] } = process;

const client = net.connect(port, ip, () => { 
    console.log('client connected');
    client.end(`${from}: ${message}`);
});
client.on('data', data => {
    console.log(data.toString());
    client.end();
});
client.on('end', function() {
    console.log('client disconnected');
});
