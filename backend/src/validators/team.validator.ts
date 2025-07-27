import Joi from "joi";
import mongoose from "mongoose";

export const createTeamSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().allow(""),
    members: Joi.array().items(Joi.string())
});

export const updateTeamSchema = Joi.object({
    id: Joi.string().length(24).required(),
    name: Joi.string(),
    description: Joi.string().allow(""),
});

export const deleteTeamSchema = Joi.object({
    id: Joi.string().length(24).required()
});

export const getTeamByIdSchema = Joi.object({
    id: Joi.string().length(24).required()
});

export const getTeamMembersSchema = Joi.object({
    id: Joi.string().length(24).required()
});