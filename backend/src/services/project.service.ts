import mongoose from "mongoose";
import { CreateProjectArgs, DeleteProjectArgs, UpdateProjectArgs } from "src/args/project.args";
import { ACTIVITY_LOG_SUB_TYPES, USER_ROLE } from "src/enums";
import { ERROR_TYPES } from "src/error";
import { ActivityLogModel } from "src/models/activityLogs.model";
import { Project } from "src/models/project.model";
import { SUCCESS_TYPES } from "src/success";
import { UniversalService } from "src/universal.service";

export class ProjectService {
    constructor() { }

    createProject = async (createProjectArgs: CreateProjectArgs, userDetails: any): Promise<any> => {
        try {
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }
            const project = new Project({
                name: createProjectArgs.name,
                description: createProjectArgs.description || "",
                teamId: createProjectArgs.teamId,
            });

            await project.save();

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.PROJECT_CREATED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: createProjectArgs.teamId || null,
                projectId: project._id || null,
                messageId: null,
                taskId: null,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.PROJECT_CREATED,
                description,
                metaData: project,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, project };
        } catch (error) {
            console.log("Error creatin project", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    updateProject = async (updateProjectArgs: UpdateProjectArgs, userDetails: any): Promise<any> => {
        try {
            const project = await Project.findById(updateProjectArgs.id);
            if (!project) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            if (project?.teamId?.toString() !== userDetails?.teamId) {
                return { message: ERROR_TYPES.ACCESS_DENIED.message };
            }

            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            project.name = updateProjectArgs?.name || project?.name;
            project.description = updateProjectArgs?.description || project?.description;

            await project.save();

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.PROJECT_UPDATED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: project?.teamId || null,
                projectId: project._id || null,
                messageId: null,
                taskId: null,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.PROJECT_UPDATED,
                description,
                metaData: project,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, project };
        } catch (error) {
            console.log("Error updating project:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    };

    getProjects = async (): Promise<any> => {
        try {
            const projects = await Project.find().populate('teamId', 'name');
            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, projects: projects || [] };
        } catch (error) {
            console.log("Error fetching projects:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    };

    deleteProject = async (deleteProjectArgs: DeleteProjectArgs, userDetails: any): Promise<any> => {
        try {
            const project = await Project.findById(deleteProjectArgs?.id);
            if (!project) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            // if (project?.teamId?.toString() !== userDetails?.teamId) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            await Project.findByIdAndDelete(deleteProjectArgs?.id);

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.PROJECT_DELETED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: project?.teamId || null,
                projectId: project._id || null,
                messageId: null,
                taskId: null,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.PROJECT_DELETED,
                description,
                metaData: project,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);
            
            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message };
        } catch (error) {
            console.log("Error deleting project:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    };

}