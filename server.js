websocket = require('ws');

const wss = new websocket.WebSocketServer({ port: 8080 });
const clients = new Map();
console.log('Server started on port 8080')

wss.on('connection', function connection(ws) {
    const id = Math.random();
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    const metadata = { id, color };
    clients.set(ws, metadata);
    ws.on('error', console.error);
    ws.on('message', function message(data) {
        console.log('received: %s', data);
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === websocket.WebSocket.OPEN) {
            client.send(data + ' from ' + metadata.id);
    }});});

    ws.send('something');
});