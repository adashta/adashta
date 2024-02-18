import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

import { IAdashtaConfigInterface } from '../init/init.interface';
import { Adashta } from '../init/init.service';

// TODO: Keep descriptive variable name.
export class AdashtaWebSocket {
  wss: WebSocket.Server;
  clients: any = {}; // TODO: Change `clients` data type.

  constructor(config: IAdashtaConfigInterface, adashta: Adashta) {
    this.wss = new WebSocket.Server({ host: config.adashtaSocketHost, port: config.adashtaSocketPort });

    this.wss.on('connection', (ws: any) => {
      // TODO: Change `ws` data type.
      const clientId = uuidv4();
      (ws as any).clientId = clientId;
      this.clients[clientId] = ws;

      adashta.emit('connection', ws);

      ws.on('message', (message: any) => {
        // TODO: Change `message` data type.
        adashta.emit('consume', { clientId, message: JSON.parse(message.toString()) });
      });

      ws.on('close', () => {
        console.log('Client disconnected ===>', ws.clientId);
        console.log('Client disconnected');
      });
    });

    adashta.on('produce', (data) => {
      this.clients[data.clientId].send(JSON.stringify(data));
    });
  }
}
