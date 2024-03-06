import { WebSocket } from 'ws';

export interface IAdashtaConnectionInterface {
  [key: string]: WebSocket;
}
