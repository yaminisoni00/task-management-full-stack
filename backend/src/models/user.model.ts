import mongoose, { Schema, Document } from 'mongoose';
import { USER_ROLE } from '../enums';

export interface UserInput extends Document {
    email: string;
    name: string;
    password: string;
    role: USER_ROLE;
    teamId?: string;   
}

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        required: true,
    },
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        default: null
    },
}, {
    timestamps: true,
})

export const User = mongoose.model<UserInput>('User', userSchema);