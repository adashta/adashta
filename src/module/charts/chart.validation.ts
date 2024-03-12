import Joi from 'joi';

export const produceChartSchema = Joi.object({
  chartId: Joi.string().required(), // TODO: Find a way to automatic assign chartId
  querySelector: Joi.string()
    .regex(/^(\.|#).*/)
    .required()
    .messages({
      'string.pattern.base': 'The string must start with either "." or "#"'
  }),
  chartData: Joi.object({
    type: Joi.string().required(),
    data: Joi.object().required(),
    options: Joi.object().required(),
    plugins: Joi.array().items(Joi.object().required()).optional(),
  }).required(),
});
