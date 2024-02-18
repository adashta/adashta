import { IAdashtaChartInterface } from './chart.interface';

export class ChartService {
  constructor() {}

  public async produce(data: IAdashtaChartInterface) {
    console.log('Charts Produce', data);
    return 1;
  }
}
