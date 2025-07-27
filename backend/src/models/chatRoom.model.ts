import { Schema, model, Types } from 'mongoose';
import mongoose from 'mongoose';

const ChatRoomSchema = new Schema({
    chatRoomMemberIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }],
    teamId: { type: Types.ObjectId, ref: 'Team' },
    createdAt: { type: Date, default: Date.now }
});

ChatRoomSchema.index({ chatRoomMemberIds: 1 }, { unique: false });

export const ChatRoomModel = model('ChatRoom', ChatRoomSchema);
