import { ChartConfiguration } from 'chart.js';

export interface IProduceChartDataInterface {
  chartId: string;
  querySelector: string;
  chartData: ChartConfiguration;
}
