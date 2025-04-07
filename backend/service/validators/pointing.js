const Joi = require("joi");

const createSessionSchema = Joi.object({
  name: Joi.string().required(),
  sprintName: Joi.string().required(),
  series: Joi.array().min(1).required(),
  color: Joi.string().required(),
});

const joinSessionSchema = Joi.object({
  sessionId: Joi.string().required(),
  name: Joi.string().required(),
  color: Joi.string().required(),
});

const storySchema = Joi.object({
  id: Joi.string().optional(),
  storyName: Joi.string().min(1).max(100).required(),
  description: Joi.string().max(200).optional().allow(""),
  link: Joi.string().optional().allow(""),
});

const addStorySchema = Joi.object({
  sessionId: Joi.string().required(),
  storyData: storySchema.required(),
});

const changeStorySchema = Joi.object({
  sessionId: Joi.string().required(),
  storyId: Joi.string().required(),
});

const votePointsSchema = Joi.object({
  storyId: Joi.string().required(),
  point: Joi.alternatives().try(Joi.string(), Joi.number()).required(),
});

module.exports = {
  createSessionSchema,
  joinSessionSchema,
  addStorySchema,
  changeStorySchema,
  votePointsSchema,
};
