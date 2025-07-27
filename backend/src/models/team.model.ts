import { Schema, model, Types, Document } from "mongoose";

export interface TeamInput extends Document {
    name: string;
    description?: string;
    adminId: Types.ObjectId;
    members?: Types.ObjectId[];
}

const teamSchema = new Schema<TeamInput>(
  {
    name: { type: String, required: true },
    description: { type: String },
    adminId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }]
  },
  { timestamps: true }
);

export const Team = model<TeamInput>("Team", teamSchema);