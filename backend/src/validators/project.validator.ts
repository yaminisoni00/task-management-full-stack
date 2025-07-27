import Joi from "joi";

// Create Project
export const createProjectSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").max(500),
  teamId: Joi.string().length(24).required(),
});

// Update Project
export const updateProjectSchema = Joi.object({
  id: Joi.string().length(24).required(),
  name: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow("").max(500).optional(),
});

// Delete Project
export const deleteProjectSchema = Joi.object({
  id: Joi.string().length(24).required(),
});

