const Joi = require("joi");

const createSessionSchema = Joi.object({
  name: Joi.string().required(),
  sprintName: Joi.string().required(),
  color: Joi.string().required(),
  columns: Joi.array().min(1).required(),
});

const joinSessionSchema = Joi.object({
  sessionId: Joi.string().required(),
  color: Joi.string().required(),
  name: Joi.string().required(),
});

const editColumnSchema = Joi.object({
  columnId: Joi.string().required(),
  newTitle: Joi.string().min(1).max(100).required(),
});

const postCommentSchema = Joi.object({
  columnId: Joi.string().required(),
  comment: Joi.string().min(1).max(500).required(),
});

const reactCommentSchema = Joi.object({
  columnId: Joi.string().required(),
  commentUserId: Joi.string().required(),
});

const spotlightUserSchema = Joi.object({
  spotlightUserId: Joi.string().required(),
});

const settingsSchema = Joi.object({
  showNames: Joi.boolean().required(),
  allowDownload: Joi.boolean().required(),
});

module.exports = {
  createSessionSchema,
  joinSessionSchema,
  editColumnSchema,
  postCommentSchema,
  reactCommentSchema,
  spotlightUserSchema,
  settingsSchema,
};
