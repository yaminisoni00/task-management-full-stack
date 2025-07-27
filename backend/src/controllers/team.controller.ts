import { Request, Response } from "express";
import { ERROR_TYPES } from "src/error";
import { TeamService } from "src/services/team.service";
import { SUCCESS_TYPES } from "src/success";
import { createTeamSchema, deleteTeamSchema, getTeamByIdSchema, updateTeamSchema } from "src/validators/team.validator";

const teamService = new TeamService();

export const createTeamController = async (req: Request, res: Response) => {
    try {
        const { error } = createTeamSchema.validate(req?.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await teamService.createTeam(req?.body, req?.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, team: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const updateTeamController = async (req: Request, res: Response) => {
    try {
        const { error } = updateTeamSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await teamService.updateTeam(req.body, req.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, team: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const getTeamsController = async (req: Request, res: Response) => {
    try {
        const result = await teamService.getTeams();
        console.log('result:====================================================== ', result);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, teams: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const deleteTeamController = async (req: Request, res: Response) => {
    try {
        const { error } = deleteTeamSchema.validate(req?.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await teamService.deleteTeam(req?.body, req?.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, team: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
};

export const getTeamMembersController = async (req: Request, res: Response) => {
    try {
        const { error } = getTeamByIdSchema.validate(req.body);
        if (error) return res.status(400).json({ message: error.details[0].message });
        const result = await teamService.getTeamMembers(req.body, req.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, team: result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}