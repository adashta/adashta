import WebSocket from 'ws';
import { v4 as uuidv4 } from 'uuid';

import { IAdashtaConfigInterface } from '../init/init.interface';
import { Adashta } from '../init/init.service';
import { adashtaConnections } from '../../common/global.variables';
import { IWebSocketInterface } from './websocket.interface';

export class AdashtaWebSocket {
  wss!: WebSocket.Server;
  adashtaConfig: IAdashtaConfigInterface;
  adashtaEvent: Adashta;

  constructor(adashtaConfig: IAdashtaConfigInterface, adashtaEvent: Adashta) {
    this.adashtaEvent = adashtaEvent;
    this.adashtaConfig = adashtaConfig;
  }

  public async init(): Promise<void> {
    this.wss = new WebSocket.Server({
      host: this.adashtaConfig.adashtaHost,
      port: this.adashtaConfig.adashtaPort,
    });

    this.wss.on('connection', (ws: IWebSocketInterface) => {
      const clientId = uuidv4();
      ws.clientId = clientId;

      console.log('Adashta: Client connected - ' + clientId);

      adashtaConnections[clientId] = ws;

      this.adashtaEvent.emit('connection', clientId);

      ws.on('close', () => {
        this.adashtaEvent.emit('disconnection', clientId);
        delete adashtaConnections[ws.clientId];
        console.log('Adashta: Client disconnected - ' + ws.clientId);
      });
    });
  }
}
