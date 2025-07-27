import { ProjectService } from "../services/project.service";
import { Request, Response } from "express";
import { ERROR_TYPES } from "../error";
import { SUCCESS_TYPES } from "../success";
import { createProjectSchema, deleteProjectSchema, updateProjectSchema } from "../validators/project.validator";

const projectService = new ProjectService();

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { error } = createProjectSchema.validate(req.body);
        console.log('error: ', error);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await projectService.createProject(req?.body, req?.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const updateProjectController = async (req: Request, res: Response) => {
    try {
        const { error } = updateProjectSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await projectService.updateProject(req?.body, req?.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const getProjectsController = async (req: Request, res: Response) => {
    try {
        const result = await projectService.getProjects();
        console.log('result: ', result);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, result });
    } catch (error) {
        console.log('error: ', error);
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const deleteProjectController = async (req: Request, res: Response) => {
    try {
        const { error } = deleteProjectSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await projectService.deleteProject(req?.body, req?.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};