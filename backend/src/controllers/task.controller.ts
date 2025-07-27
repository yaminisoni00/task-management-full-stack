import { Request, Response } from "express";
import { ERROR_TYPES } from "../error";
import { TaskService } from "../services/task.service";
import { SUCCESS_TYPES } from "../success";
import { createTaskSchema, deleteTaskSchema, updateTaskSchema } from "../validators/task.validator";

const taskService = new TaskService();

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const { error } = createTaskSchema.validate(req.body);
        console.log('error: ', error);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await taskService.createTask(req.body, req.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, task: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const updateTaskController = async (req: Request, res: Response) => {
    try {
        const { error } = updateTaskSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await taskService.updateTask({ id: req.params.id, ...req.body }, req.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, task: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const getTasksController = async (req: Request, res: Response) => {
    try {
        const result = await taskService.getTasks(req.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, tasks: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const deleteTaskController = async (req: Request, res: Response) => {
    try {
        const { error } = deleteTaskSchema.validate({ id: req.params.id });
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await taskService.deleteTask({ id: req.params.id}, req.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, task: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};
