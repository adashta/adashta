import Joi from 'joi';
import { EAdashtaChartTypeEnum } from './chart.enum';

export const produceChartDataSchema = Joi.object({
  chartId: Joi.string().required(), // TODO: Find a way to automatic assign chartId
  querySelector: Joi.string()
    .regex(/^(\.|#).*/)
    .required()
    .messages({
      'string.pattern.base': 'The string must start with either "." or "#"',
    }),
  chartData: Joi.object({
    type: Joi.string()
      .valid(
        EAdashtaChartTypeEnum.BAR,
        EAdashtaChartTypeEnum.BUBBLE,
        EAdashtaChartTypeEnum.DOUGHNUT,
        EAdashtaChartTypeEnum.LINE,
        EAdashtaChartTypeEnum.PIE,
        EAdashtaChartTypeEnum.POLARAREA,
        EAdashtaChartTypeEnum.RADAR,
        EAdashtaChartTypeEnum.SCATTER,
      )
      .required(),
    data: Joi.object().required(),
    options: Joi.object().required(),
    plugins: Joi.array().items(Joi.object().required()).optional(),
  }).required(),
});
