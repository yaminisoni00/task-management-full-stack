import { Schema, model, Types, Document } from "mongoose";

export interface MessageInput extends Document {
  messageBody: string;
  sentByUserId: Types.ObjectId;
  teamId: Types.ObjectId;
  timestamp: Date;
  chatRoomId: Types.ObjectId;
}

const messageSchema = new Schema<MessageInput>(
  {
    messageBody: { type: String, required: true },
    sentByUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    teamId: { type: Schema.Types.ObjectId, ref: "Team" },
    timestamp: { type: Date, default: Date.now },
    chatRoomId: { type: Schema.Types.ObjectId, ref: "ChatRoom", required: true }
  },
  { timestamps: true }
);

export const Message = model<MessageInput>("Message", messageSchema);
