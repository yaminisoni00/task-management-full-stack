import { CreateUserArgs, DeleteUserArgs, UpdateUserArgs } from "../args/user.args";
import mongoose from "mongoose";
import { User } from "../models/user.model";
import { ERROR_TYPES } from "../error";
import { Team } from "../models/team.model";
import { SUCCESS_TYPES } from "../success";
import { ACTIVITY_LOG_SUB_TYPES } from "src/enums";
import { UniversalService } from "src/universal.service";
import { ActivityLogModel } from "src/models/activityLogs.model";
import bcrypt from "bcrypt";

export const createUser = async (createUserArgs: CreateUserArgs): Promise<any> => {
    const session = await mongoose.startSession();
    session.startTransaction(); // START A TRANSACTION TO MAINTAIN CONSISTENCY
    try {
        const userExists = await User.findOne({ email: createUserArgs?.email }).session(session);
        if (userExists) {
            return { message: ERROR_TYPES.USER_ALREADY_EXISTS.message };
        }

        const newUser = new User({
            email: createUserArgs?.email,
            name: createUserArgs?.name,
            role: createUserArgs?.role,
            password: await bcrypt.hash(createUserArgs?.password, 10)
        });

        if (createUserArgs.teamId) {
            newUser.teamId = createUserArgs.teamId;
        }

        await newUser.save({ session });

        const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.USER_CREATED);
        const activityLogsObject = new ActivityLogModel({
            // userId: newUser?._id,
            teamId: newUser?.teamId || null,
            projectId: null,
            messageId: null,
            logType,
            logSubType: ACTIVITY_LOG_SUB_TYPES.USER_CREATED,
            description,
            metaData: newUser,
            timestamp: new Date()
        });

        await activityLogsObject.save({ session });

        await session.commitTransaction();
        session.endSession();

        return { newUser, message: SUCCESS_TYPES.USER_CREATED.message, code: SUCCESS_TYPES.USER_CREATED.code };

    } catch (error) {
        // IF ANY ERROR OCCURS, ROLLBACK CHANGES
        await session.abortTransaction();
        session.endSession();
        return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };;
    }
}

export const getUsers = async (): Promise<any> => {
    try {
        const users = await User.find();
        if (!users?.length) {
            return { message: ERROR_TYPES.NO_USERS_FOUND.message, users: [] };
        }
        return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, users };
    } catch (error) {
        return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
    }
};

export const updateUser = async (updateUserArgs: UpdateUserArgs): Promise<any> => {
    try {
        const userExists = await User.findById(updateUserArgs?.id);
        if (!userExists) {
            return { message: ERROR_TYPES.USER_DOES_NOT_EXIST.message };
        }

        const updatedUser = await User.findByIdAndUpdate(
            updateUserArgs?.id,
            {
                email: updateUserArgs?.email,
                name: updateUserArgs?.name,
                role: updateUserArgs?.role
            },
            { new: true }
        );

        const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.USER_UPDATED);
        const activityLogsObject = new ActivityLogModel({
            // userId: updatedUser?._id,
            teamId: updatedUser?.teamId || null,
            projectId: null,
            messageId: null,
            logType,
            logSubType: ACTIVITY_LOG_SUB_TYPES.USER_UPDATED,
            description,
            metaData: updatedUser,
            timestamp: new Date()
        });
        await ActivityLogModel.create([activityLogsObject]);

        return { updatedUser, message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, code: SUCCESS_TYPES.DEFAULT_SUCCESS.code };
    } catch (error) {
        return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
    }
}

export const deleteUser = async (deleteUserArgs: DeleteUserArgs): Promise<any> => {
    try {
        const userExists = await User.findById(deleteUserArgs?.id);
        if (!userExists) {
            return { message: ERROR_TYPES.USER_DOES_NOT_EXIST.message };
        }
        await User.findByIdAndDelete(deleteUserArgs?.id);

        const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.USER_DELETED);
        const activityLogsObject = new ActivityLogModel({
            // userId: userExists?._id || null,
            teamId: userExists?.teamId || null,
            projectId: null,
            messageId: null,
            logType,
            logSubType: ACTIVITY_LOG_SUB_TYPES.USER_DELETED,
            description,
            metaData: null,
            timestamp: new Date()
        });
        await ActivityLogModel.create([activityLogsObject]);

        return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, code: SUCCESS_TYPES.DEFAULT_SUCCESS.code };
    } catch (error) {
        return {
            message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error
        }
    }
}