import { Schema, model, Types, Document } from "mongoose";

export interface ProjectInput extends Document{
  name: string;
  description?: string;
  teamId: Types.ObjectId;
}

const projectSchema = new Schema<ProjectInput>(
  {
    name: { type: String, required: true },
    description: { type: String },
    teamId: { type: Schema.Types.ObjectId, ref: "Team", required: true },
  },
  { timestamps: true }
);

export const Project = model<ProjectInput>("Project", projectSchema);
