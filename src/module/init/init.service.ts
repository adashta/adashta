import dotenv from 'dotenv';
import { EventEmitter } from 'events';

import { ChartService } from '../charts/chart.service';
import { IAdashtaConfigInterface } from './init.interface';
import { AdashtaWebSocket } from '../websocket/websocket.service';
import { isRelativeUrl } from '../../common/utils.service';

dotenv.config();

export class Adashta extends EventEmitter {
  adashtaHost: string;
  adashtaPort: number;

  constructor(config: IAdashtaConfigInterface) {
    super();

    this.adashtaHost = config.adashtaHost || 'localhost';

    if (this.adashtaHost && !isRelativeUrl(this.adashtaHost)) {
      console.error('Adashta: Invalid socket host');
      process.exit(1);
    }

    this.adashtaPort = config.adashtaPort || 8080;

    if (this.adashtaPort < 0 || this.adashtaPort > 65535) {
      console.error('Adashta: Invalid socket port');
      process.exit(1);
    }

    const adashta = new AdashtaWebSocket(
      {
        adashtaHost: this.adashtaHost,
        adashtaPort: this.adashtaPort,
      },
      this,
    );

    adashta.init();

    console.log('Adashta: Connection established');
  }

  public charts() {
    return new ChartService(
      {
        adashtaHost: this.adashtaHost,
        adashtaPort: this.adashtaPort,
      },
      this,
    );
  }
}
