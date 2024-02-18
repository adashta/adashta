import { EAdashtaChartTypeEnum } from './chart.enum';

export interface IAdashtaChartInterface {
  topic: string;
  chartType: EAdashtaChartTypeEnum;
  chartData: IAdashtaChartDataInterface;
}

interface IAdashtaChartDataInterface {
  labels: string[];
  datasets: string[];
}
