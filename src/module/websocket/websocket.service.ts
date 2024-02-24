import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

import { IAdashtaConfigInterface } from '../init/init.interface';
import { Adashta } from '../init/init.service';
import { adashtaClients } from '../../common/global.constant';

// TODO: Keep descriptive variable name.
export class AdashtaWebSocket {
  wss: WebSocket.Server | undefined; // TODO: Change `wss` data type and variable name
  config: any; // TODO: Change `config` data type and variable name
  adashtaEvent: any; // TODO: Change `adashtaEvent` data type and variable name

  constructor(config: IAdashtaConfigInterface, adashtaEvent: Adashta) {
    this.adashtaEvent = adashtaEvent;
    this.config = config;
  }

  public async init() {
    this.wss = new WebSocket.Server({ host: this.config.adashtaSocketHost, port: this.config.adashtaSocketPort });

    this.wss.on('connection', (ws: any) => {
      // TODO: Change `ws` data type.
      const clientId = uuidv4();
      (ws as any).clientId = clientId;
      adashtaClients[clientId] = ws;

      this.adashtaEvent.emit('connection', clientId);

      ws.on('message', (message: any) => {
        // TODO: Change `message` data type.
        this.adashtaEvent.emit('consume', { clientId, message: JSON.parse(message.toString()) });
      });

      ws.on('close', () => {
        console.log('Client disconnected ===>', ws.clientId);
        console.log('Client disconnected');
      });
    });
  }

  public async produce(clientId: any, data: any) {
    console.log('HEHEHEHEHEHEHEHE');
    adashtaClients[clientId].send(JSON.stringify(data));
  }
}
