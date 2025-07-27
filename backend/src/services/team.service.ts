import mongoose from "mongoose";
import { Team } from "../models/team.model";
import { CreateTeamArgs, DeleteTeamArgs, GetTeamMembersArgs, UpdateTeamArgs } from "src/args/team.args";
import { ERROR_TYPES } from "../error";
import { SUCCESS_TYPES } from "../success";
import { ACTIVITY_LOG_SUB_TYPES, USER_ROLE } from "../enums";
import { ActivityLogModel } from "../models/activityLogs.model";
import { UniversalService } from "../universal.service";

export class TeamService {
    constructor() { }

    createTeam = async (createTeamArgs: CreateTeamArgs, userDetails: any): Promise<any> => {
        try {
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }
            const teamData = new Team({
                name: createTeamArgs.name,
                description: createTeamArgs.description || "",
                // adminId: userDetails._id,
                adminId: '6881c74bfa0773826215d66e',
                members: createTeamArgs.members || []
            });

            await teamData.save();
            console.log('teamData: ', teamData);
            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.TEAM_CREATED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                // teamId: teamData?._id || null,
                projectId: null,
                messageId: null,
                taskId: null,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.TEAM_CREATED,
                description,
                metaData: teamData,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, team: teamData };

        } catch (error) {
            console.log("Error creating team:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    updateTeam = async (updateTeamArgs: UpdateTeamArgs, userDetails: any): Promise<any> => {
        try {

            const teamExists = await Team.findOne({ _id: updateTeamArgs.id });
            if (!teamExists) return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };

            if (userDetails?.teamId?.toString() !== teamExists._id?.toString()) {
                return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };
            } 
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            const membersToAdd: mongoose.Types.ObjectId[] = [];
            const existingMemberIds = (teamExists.members || []).map((memberId: any) => memberId.toString());
            for (const memberId of (updateTeamArgs?.members || [])) {
                if (!existingMemberIds.includes(memberId?.toString())) {
                    membersToAdd.push(new mongoose.Types.ObjectId(memberId));
                }
            }

            const updatedTeam = await Team.findByIdAndUpdate(updateTeamArgs?.id, {
                name: updateTeamArgs?.name || teamExists.name,
                description: updateTeamArgs?.description || teamExists?.description,
                members: [...(teamExists.members || []), ...(membersToAdd || [])],
            }, { new: true });

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.TEAM_UPDATED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: updatedTeam?._id || null,
                taskId: null,
                projectId: null,
                messageId: null,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.TEAM_UPDATED,
                description,
                metaData: updatedTeam,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, team: updatedTeam };

        } catch (error) {
            console.log("Error updating team:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    getTeams = async (): Promise<any> => {
        try {
            const teams = await Team.find().populate('members', 'name email');
            if (!teams?.length) {
                return { message: ERROR_TYPES.ENTITY_DOES_NOT_EXIST.message };
            }
            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, teams };
        } catch (error) {
            console.log("Error getting team:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    deleteTeam = async (deleteTeamArgs: DeleteTeamArgs, userDetails: any): Promise<any> => {
        try {
            // if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
            //     return { message: ERROR_TYPES.ACCESS_DENIED.message };
            // }

            const teamExists = await Team.findById(deleteTeamArgs?.id);
            if (!teamExists) {
                return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };
            }

            await Team.findByIdAndDelete(deleteTeamArgs?.id);

            const { logType, description } = UniversalService.getActivityLogMetadata(ACTIVITY_LOG_SUB_TYPES.TEAM_DELETED);
            const activityLogsObject = new ActivityLogModel({
                // userId: userDetails._id,
                teamId: teamExists?._id || null,
                taskId: null,
                projectId: null,
                messageId: null,
                logType,
                logSubType: ACTIVITY_LOG_SUB_TYPES.TEAM_DELETED,
                description,
                metaData: null,
                timestamp: new Date()
            });
            await ActivityLogModel.create([activityLogsObject]);

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message };

        } catch (error) {
            console.log("Error deleting team:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };
        }
    }

    getTeamMembers = async (getTeamMembersArgs: GetTeamMembersArgs, userDetails: any): Promise<any> => {
        try {
            if (getTeamMembersArgs?.id !== userDetails?.teamId?.toString()) {
                return { message: ERROR_TYPES.ACCESS_DENIED.message };
            }

            const teamExists = await Team.findById(getTeamMembersArgs?.id);
            if (!teamExists) {
                return { message: ERROR_TYPES.ENTITY_NOT_FOUND.message };
            }

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, members: teamExists.members || [] };
        } catch (error) {
            console.log("Error getting team members:", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error };

        }
    }

}