import { WebSocketServer } from 'ws';

import url from 'url';
import UserExtraction from './auth/auth';


const wss = new WebSocketServer({ port: 8080 });

wss.on('connection',async function connection(ws, req) {
    //@ts-ignore
    const token: string = url.parse(req.url, true).query.token;
    const userDetail=await UserExtraction(token);
  ws.send("connected");
   console.log(userDetail)

  

});

console.log('done');