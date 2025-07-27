import mongoose from "mongoose";
import { CreateTaskArgs, DeleteTaskArgs, UpdateTaskArgs } from "src/args/task.args";
import { ACTIVITY_LOG_SUB_TYPES, USER_ROLE } from "src/enums";
import { ERROR_TYPES } from "src/error";
import { ActivityLogModel } from "src/models/activityLogs.model";
import { Project } from "src/models/project.model";
import { Task } from "src/models/task.model";
import { Team } from "src/models/team.model";
import { SUCCESS_TYPES } from "src/success";
import { UniversalService } from "src/universal.service";

export class TaskService {
    constructor() { }

    createTask = async (createTaskArgs: CreateTaskArgs, userDetails: any): Promise<any> => {
        try {
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            // NEED TO CHECK IF THE PROJECT EXISTS
            const projectExists = await Project.findById(createTaskArgs?.projectId);
            if (!projectExists) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            // // CHECKING IF USER IDS PROVIDED IS PART OF THAT PROJECT
            // const teamExists = await Project.findById(projectExists?.teamId);
            // if (!teamExists) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            // const userPartOfTeamOrNot = await Team.findOne({ _id: teamExists?.teamId, members: { $in: [createTaskArgs.assignedTo] } });
            // if (!userPartOfTeamOrNot) return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message };

            const newTask = new Task({
                title: createTaskArgs.title,
                description: createTaskArgs.description || "",
                status: createTaskArgs.status,
                projectId: new mongoose.Types.ObjectId(createTaskArgs.projectId),
                assignedTo: new mongoose.Types.ObjectId(createTaskArgs.assignedTo),
            })

            await newTask.save();

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.TASK_CREATED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: projectExists.teamId || null,
                projectId: createTaskArgs.projectId || null,
                messageId: null,
                taskId: newTask._id,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.TASK_CREATED,
                description,
                metaData: newTask,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, task: newTask };

        } catch (error) {
            console.log("Error creating task:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    updateTask = async (updateTaskArgs: UpdateTaskArgs, userDetails: any): Promise<any> => {
        try {
            const task = await Task.findById(updateTaskArgs?.id);
            if (!task) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            // // AS ONLY ADMIN OR MANAGER CAN UPDATE TASK
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            const updatedTask = await Task.findByIdAndUpdate(updateTaskArgs.id,
                {
                    title: updateTaskArgs.title || task.title,
                    description: updateTaskArgs.description || task.description,
                    status: updateTaskArgs.status || task.status,
                    assignedTo: updateTaskArgs.assignedTo ? new mongoose.Types.ObjectId(updateTaskArgs.assignedTo) : task.assignedTo,
                }, { new: true }
            );

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.TASK_UPDATED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: null,
                projectId: updatedTask?.projectId || null,
                messageId: null,
                taskId: updateTaskArgs.id,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.TASK_UPDATED,
                description,
                metaData: updatedTask,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, task: updatedTask };
        } catch (error) {
            console.log("Error updating task:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    getTasks = async (userDetails: any): Promise<any> => {
        try {
            // let tasks;
            // if ([USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails.role)) {
            //     tasks = await Task.find();
            // } else {
            //     tasks = await Task.find({ assignedTo: userDetails._id });
            // }
            const tasks = await Task.find().populate("projectId", "name description").populate("assignedTo", "name email");

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, tasks: tasks || [] };
        } catch (error) {
            console.log("Error fetching tasks:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    };

    deleteTask = async (deleteTaskArgs: DeleteTaskArgs, userDetails: any): Promise<any> => {
        try {
            const task = await Task.findById(deleteTaskArgs?.id);
            if (!task) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            await Task.findByIdAndDelete(deleteTaskArgs.id);

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.TASK_DELETED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: null,
                projectId: null,
                messageId: null,
                taskId: deleteTaskArgs.id,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.TASK_DELETED,
                description,
                metaData: null,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message };

        } catch (error) {
            console.log("Error deleting task:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    };

}