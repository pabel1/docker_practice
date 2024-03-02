const Joi = require("joi");

const musicValidationSchema = Joi.object({
  title: Joi.string().required(),
  artist: Joi.string().required(),
  Album: Joi.string(),
  releaseYear: Joi.string(),
  coverImg: Joi.object({
    secure_url: Joi.string(),
    public_id: Joi.string(),
  }),
  musicUrl: Joi.string().required(),
  musicDetails: Joi.string(),
  duration: Joi.string(),
  genre: Joi.string(),
  compositeKey: Joi.string(),
});

module.exports = musicValidationSchema;
