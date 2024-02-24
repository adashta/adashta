import dotenv from 'dotenv';
import { EventEmitter } from 'events';

import { ChartService } from '../charts/chart.service';
import { IAdashtaConfigInterface } from './init.interface';
import { AdashtaWebSocket } from '../websocket/websocket.service';
import { isRelativeUrl } from '../../common/utils.service';

dotenv.config();

export class Adashta extends EventEmitter {
  adashtaSocketHost; // TODO: Change `adashtaSocketHost` data type.
  adashtaSocketPort; // TODO: Change `adashtaSocketPort` data type.

  constructor(config: IAdashtaConfigInterface) {
    super();
    this.adashtaSocketHost = config.adashtaSocketHost || 'localhost';

    if (this.adashtaSocketHost && !isRelativeUrl(this.adashtaSocketHost)) {
      console.error('Adashta: Invalid socket host');
      process.exit(1);
    }

    this.adashtaSocketPort = config.adashtaSocketPort || 8080;

    if (this.adashtaSocketPort < 0 || this.adashtaSocketPort > 65535) {
      console.error('Adashta: Invalid socket port');
      process.exit(1);
    }

    const adashta = new AdashtaWebSocket(
      {
        adashtaSocketHost: this.adashtaSocketHost,
        adashtaSocketPort: this.adashtaSocketPort,
      },
      this,
    );

    adashta.init();

    console.log('Adashta: Connection established');
  }

  public charts() {
    return new ChartService(
      {
        adashtaSocketHost: this.adashtaSocketHost,
        adashtaSocketPort: this.adashtaSocketPort,
      },
      this,
    );
  }
}

/* adashta.charts.produce({
  topic: 'topic',
  data: {
    chartType: 'line',
    chartData: {
      ...
    }
  }
});

or

adashta.produce({
  topic: 'topic',
  type: 'charts',
  data: {
    chartType: 'line',
    chartData: {
      ...
    }
  }
});
*/
