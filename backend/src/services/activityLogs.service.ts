import { USER_ROLE } from "../enums";
import { ERROR_TYPES } from "../error";
import { ActivityLogModel } from "../models/activityLogs.model";
import { SUCCESS_TYPES } from "../success";

export class ActivityLogsService {
    constructor() { }

    getActivityLogs = async (userDetails: any): Promise<any> => {
        try {
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }
            const activityLogs = await ActivityLogModel.find().sort({ timestamp: -1 });
            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, activityLogs: activityLogs || [] };
        } catch (error) {
            console.log("Error getting activity logs", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    }
}