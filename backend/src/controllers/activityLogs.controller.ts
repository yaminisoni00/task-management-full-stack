import { ActivityLogsService } from "src/services/activityLogs.service";
import { Request, Response } from "express";
import { ERROR_TYPES } from "src/error";
import { SUCCESS_TYPES } from "src/success";


const activityLogsService = new ActivityLogsService();
export const getActivityLogsController = async (req: Request, res: Response) => {
    try {
        const result = await activityLogsService.getActivityLogs(req?.user);
        return res.status(result.code || 200).json({ message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, result });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}