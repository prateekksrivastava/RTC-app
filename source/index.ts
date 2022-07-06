import {createServer, Server} from 'http';
import staticHandler from 'serve-handler';
import dotenv from 'dotenv';
import ws, { WebSocketServer } from 'ws';

// initiate to configure dotenv
dotenv.config();
const port = process.env.PORT;

const server = createServer((request, response) => {
    return staticHandler(request, response, {
        public: process.cwd()+'/public/'
    });
});

const socketServer = new WebSocketServer({ server });

socketServer.on('connection', (client) => {
    console.log(client, "WebSocketServer got Connected");

    client.on('message', (message) => {
        broadcast(message);
    });
});

function broadcast(message) {
    for(const client of socketServer.clients){
        if(client.readyState === ws.OPEN){
            client.send(message)
        }
    }
}

server.listen(port, () => {
    console.log("Server Listens at port " + port);
});