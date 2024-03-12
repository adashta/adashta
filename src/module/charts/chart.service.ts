import { adashtaConnections } from '../../common/global.variables';
import { IAdashtaConfigInterface } from '../init/init.interface';
import { Adashta } from '../init/init.service';
import { AdashtaWebSocket } from '../websocket/websocket.service';
import { produceChartDataSchema } from './chart.validation';
import { IProduceChartDataInterface } from './chart.interface';

export class ChartService extends AdashtaWebSocket {
  constructor(config: IAdashtaConfigInterface, adashta: Adashta) {
    super(config, adashta);
  }

  public async produce(clientId: string, data: IProduceChartDataInterface): Promise<void> {
    const validation = produceChartDataSchema.validate(data);

    if (validation.error) {
      console.error('Adashta: Invalid chart data ==>', validation?.error?.details);
      return;
    }

    adashtaConnections[clientId].send(JSON.stringify(data));
  }
}
