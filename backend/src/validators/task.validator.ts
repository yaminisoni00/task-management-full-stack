import Joi from "joi";
import { CreateTaskArgs, UpdateTaskArgs, DeleteTaskArgs } from "src/args/task.args";
import { TASK_STATUS } from "../enums";

export const createTaskSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid(TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE).optional(),
  projectId: Joi.string().required(),
  assignedTo: Joi.string().required(),
});

export const updateTaskSchema = Joi.object({
  id: Joi.string().required(),
  title: Joi.string().min(3).max(100).optional(),
  description: Joi.string().allow("").optional(),
  status: Joi.string().valid(TASK_STATUS.TODO, TASK_STATUS.IN_PROGRESS, TASK_STATUS.DONE).optional(),
  assignedTo: Joi.string().optional(),
}); 

export const deleteTaskSchema = Joi.object({
  id: Joi.string().required(),
});