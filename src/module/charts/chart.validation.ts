import Joi from 'joi';

export const produceChartSchema = Joi.object({
  chartId: Joi.string().required(),
  querySelector: Joi.string().required(),
  chartData: Joi.object({
    type: Joi.string().required(),
    data: Joi.object().required(),
    options: Joi.object().required(),
    plugins: Joi.array().items(Joi.object().required()).optional(),
  }).required(),
});
