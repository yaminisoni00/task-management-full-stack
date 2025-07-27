import { CreateChatRoomArgs, GetChatRoomMessagesArgs, SendChatRoomMessagesArgs } from "src/args/messages.args";
import { USER_ROLE } from "../enums";
import { ERROR_TYPES } from "../error";
import { ChatRoomModel } from "../models/chatRoom.model";
import { Message } from "../models/message.model";
import { SUCCESS_TYPES } from "../success";

export class MessageService {
    constructor() { }

    // CREATE OR GET EXISTING CHAT ROOM
    createChatRoom = async (createChatRoomArgs: CreateChatRoomArgs, userDetails: any) => {
        try {
            if (![USER_ROLE.ADMIN, USER_ROLE.MANAGER].includes(userDetails?.role)) {
                return { message: ERROR_TYPES.ACCESS_DENIED.message };
            }
            const existingChatRoom = await ChatRoomModel.findOne({
                chatRoomMemberIds: { $all: [createChatRoomArgs?.chatRoomMemberId, userDetails?._id] },
                teamId: createChatRoomArgs?.teamId
            })

            if (existingChatRoom) {
                return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, chatRoom: existingChatRoom };
            }

            const chatRoom = await ChatRoomModel.create({
                chatRoomMemberIds: [createChatRoomArgs?.chatRoomMemberId, userDetails._id],
                teamId: createChatRoomArgs.teamId
            })

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, chatRoom: chatRoom || null }

        } catch (error) {
            console.log("Error creating chat room", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    }

    // GETTING ALL MY CHAT ROOMS
    getChatRooms = async (userDetails: any) => {
        try {
            const chatRooms = await ChatRoomModel.find({
                chatRoomMemberIds: userDetails._id
            }).populate('chatRoomMemberIds', 'name email');

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, chatRooms: chatRooms || [] };
        } catch (error) {
            console.log("Error getting chat rooms", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error }
        }
    }

    getChatRoomMessages = async (getChatRoomMessagesArgs: GetChatRoomMessagesArgs, userDetails: any) => {
        try {
            const messages = await Message.find({ chatRoomId: getChatRoomMessagesArgs.chatRoomId })
            if (!messages?.length) return { messages: [], message: SUCCESS_TYPES.DEFAULT_SUCCESS.message };
            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, messages: messages || [] };
        } catch (error) {
            console.log("Error getting chat room messages", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error }
        }
    }

    sendChatRoomMessages = async (sendChatRoomMessagesArgs: SendChatRoomMessagesArgs, userDetails: any) => {
        try {
            const newMessage = await Message.create({
                messageBody: sendChatRoomMessagesArgs.messageBody,
                sentByUserId: userDetails._id,
                teamId: userDetails.teamId,
                chatRoomId: sendChatRoomMessagesArgs.chatRoomId,
                timestamp: new Date()
            });

            await newMessage.save();

            return { message: SUCCESS_TYPES.DEFAULT_SUCCESS.message, newMessage: newMessage || null };

        } catch (error) {
            console.log("Error sending chat room message", error);
            return { message: ERROR_TYPES.INTERNAL_SERVER_ERROR.message, error };
        }
    }
}