import { IAdashtaConfigInterface } from './init.interface';

export class Adashta {
  config: IAdashtaConfigInterface;
  constructor(config: IAdashtaConfigInterface) {
    if (!config.host) {
      console.error('Adashta: host is required');
    } else if (!config.port) {
      console.error('Adashta: port is required');
    }

    this.config = config;
  }
}
