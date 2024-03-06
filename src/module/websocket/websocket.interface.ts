import WebSocket from 'ws';

export interface IWebSocketInterface extends WebSocket {
  clientId: string;
}
