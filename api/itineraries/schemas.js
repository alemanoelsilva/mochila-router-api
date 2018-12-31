'use strict';

const Joi = require('joi');

const place = Joi.object({
  name: Joi.string().optional(),
  attraction: Joi.string().optional(),
});

exports.postRequest = Joi.object({
  isActive: Joi.boolean().required().optional(true),
  isPrivate: Joi.boolean().required().optional(true),
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  places: Joi.array().items(place).required(),
  user: Joi.string().required(),
}).required();

exports.postResponse = Joi.object({
  id: Joi.string().min(36).max(36).required(),
  isActive: Joi.boolean().required(),
  isPrivate: Joi.boolean().required(),
  name: Joi.string().required(),
  description: Joi.string().required(),
  duration: Joi.number().required(),
  places: Joi.array().items(place).required(),
  user: Joi.string().required(),
  createdAt: Joi.string().required(),
}).required();

exports.getRequest = Joi.object({
  isActive: Joi.boolean().optional().default(true),
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  duration: Joi.number().optional(),
  places: Joi.array().items(place).optional(),
  initialDate: Joi.string().optional(),
  endDate: Joi.string().optional(),
  limit: Joi.number().optional().default(10),
  page: Joi.number().optional().default(1),
}).optional();

exports.getResponse = Joi.object({
  itineraries: Joi.array().items(Joi.object({
    id: Joi.string().min(36).max(36).required(),
    isPrivate: Joi.boolean().required(),
    isActive: Joi.boolean().required(),
    name: Joi.string().required(),
    description: Joi.string().required(),
    duration: Joi.number().required(),
    user: Joi.string().required(),
    places: Joi.array().items(place).required(),
    createdAt: Joi.string().required(),
    updatedAt: Joi.string().optional(),
  })).required(),
  count: Joi.number().required(),
});

exports.putOrDeleteRequest = Joi.object({
  id: Joi.string().min(36).max(36).required(),
});

exports.putOrDeleteResponse = Joi.object({
  message: Joi.string().required(),
});
