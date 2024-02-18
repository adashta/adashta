import dotenv from 'dotenv';
import { EventEmitter } from 'events';

import { ChartService } from '../charts/chart.service';
import { IAdashtaConfigInterface } from './init.interface';
import { AdashtaWebSocket } from '../websocket/websocket.service';
import { isRelativeUrl } from '../../common/utils.service';

dotenv.config();

export class Adashta extends EventEmitter {
  constructor(config: IAdashtaConfigInterface) {
    super();
    const adashtaSocketHost = config.adashtaSocketHost || 'localhost';

    if (adashtaSocketHost && !isRelativeUrl(adashtaSocketHost)) {
      console.error('Adashta: Invalid socket host');
      process.exit(1);
    }

    const adashtaSocketPort = config.adashtaSocketPort || 8080;

    if (adashtaSocketPort < 0 || adashtaSocketPort > 65535) {
      console.error('Adashta: Invalid socket port');
      process.exit(1);
    }

    new AdashtaWebSocket(
      {
        adashtaSocketHost,
        adashtaSocketPort,
      },
      this,
    );

    console.log('Adashta: Connection established');
  }

  public charts() {
    return new ChartService();
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
