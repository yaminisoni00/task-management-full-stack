import { ACTIVITY_LOG_SUB_TYPES, ACTIVITY_LOG_TYPES } from "./enums";

export class UniversalService {

    static getActivityLogMetadata = (logSubType: ACTIVITY_LOG_SUB_TYPES): { description: string, logType: ACTIVITY_LOG_TYPES } => {
        try {
            let logType: ACTIVITY_LOG_TYPES, description: string;

            switch (logSubType) {
                case ACTIVITY_LOG_SUB_TYPES.USER_CREATED:
                    logType = ACTIVITY_LOG_TYPES.USER;
                    description = "User Created";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.USER_UPDATED:
                    logType = ACTIVITY_LOG_TYPES.USER;
                    description = "User Updated";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.USER_DELETED:
                    logType = ACTIVITY_LOG_TYPES.USER;
                    description = "User Deleted";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.TEAM_CREATED:
                    logType = ACTIVITY_LOG_TYPES.TEAM;
                    description = "Team Created";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.TEAM_UPDATED:
                    logType = ACTIVITY_LOG_TYPES.TEAM;
                    description = "Team Updated";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.TEAM_DELETED:
                    logType = ACTIVITY_LOG_TYPES.TEAM;
                    description = "Team Deleted";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.PROJECT_CREATED:
                    logType = ACTIVITY_LOG_TYPES.PROJECT;
                    description = "Project Created";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.PROJECT_UPDATED:
                    logType = ACTIVITY_LOG_TYPES.PROJECT;
                    description = "Project Updated";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.PROJECT_DELETED:
                    logType = ACTIVITY_LOG_TYPES.PROJECT;
                    description = "Project Deleted";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.TASK_CREATED:
                    logType = ACTIVITY_LOG_TYPES.TASK;
                    description = "Task Created";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.TASK_UPDATED:
                    logType = ACTIVITY_LOG_TYPES.TASK;
                    description = "Task Updated";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.TASK_DELETED:
                    logType = ACTIVITY_LOG_TYPES.TASK;
                    description = "Task Deleted";
                    break;

                case ACTIVITY_LOG_SUB_TYPES.MESSAGE_SENT:
                    logType = ACTIVITY_LOG_TYPES.MESSAGE;
                    description = "Message Created";
                    break;
            }

            return { logType, description };
        } catch (err) {
            throw err;
        }
    };
}
