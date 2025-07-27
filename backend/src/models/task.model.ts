import { Schema, model, Types, Document } from "mongoose";
import { TASK_STATUS } from "../enums";

export interface TaskInput extends Document {
  title: string;
  description?: string;
  status: TASK_STATUS;
  projectId: Types.ObjectId;
  assignedTo: Types.ObjectId;
}

const taskSchema = new Schema<TaskInput>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: Object.values(TASK_STATUS),
      default: TASK_STATUS.TODO,
    },
    projectId: { type: Schema.Types.ObjectId, ref: "Project", required: true },
    assignedTo: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const Task = model<TaskInput>("Task", taskSchema);
