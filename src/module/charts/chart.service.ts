import { IAdashtaConfigInterface } from '../init/init.interface';
import { Adashta } from '../init/init.service';
import { AdashtaWebSocket } from '../websocket/websocket.service';

export class ChartService extends AdashtaWebSocket {
  constructor(config: IAdashtaConfigInterface, adashta: Adashta) {
    super(config, adashta);
  }
}
