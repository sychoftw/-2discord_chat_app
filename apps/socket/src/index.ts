import { WebSocketServer } from 'ws';

import url from 'url';


const wss = new WebSocketServer({ port: 8080 });



wss.on('connection', function connection(ws, req) {
  //@ts-ignore
  ws.send('something')

   ws.on('message', function message(data, isBinary) {
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data, { binary: isBinary });
      }
    });
  });
});

console.log('done');