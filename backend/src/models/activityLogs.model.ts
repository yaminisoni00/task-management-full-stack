import mongoose from "mongoose";
import { ACTIVITY_LOG_SUB_TYPES, ACTIVITY_LOG_TYPES } from "src/enums";

const activityLogSchema = new mongoose.Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        teamId: { type: mongoose.Schema.Types.ObjectId, ref: "Team", default: null },
        taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task", default: null },
        projectId: { type: mongoose.Schema.Types.ObjectId, ref: "Project", default: null },
        messageId: { type: mongoose.Schema.Types.ObjectId, ref: "Message", default: null },
        logType: { type: String, enum: Object.values(ACTIVITY_LOG_TYPES), required: true },
        logSubType: { type: String, enum: Object.values(ACTIVITY_LOG_SUB_TYPES), required: true },
        description: { type: String },
        metaData: { type: Object, required: false },
        timestamp: { type: Date, default: Date.now }
    },
    { timestamps: true }
);

export const ActivityLogModel = mongoose.model("ActivityLog", activityLogSchema);
