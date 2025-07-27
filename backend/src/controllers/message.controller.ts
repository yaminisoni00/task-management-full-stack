import { Request, Response } from "express";
import { ERROR_TYPES } from "../error";
import { initSocketServer } from "../server";
import { MessageService } from "../services/message.service";
import { SUCCESS_TYPES } from "../success";

const messageService = new MessageService();

export const createChatRoomController = async (req: Request, res: Response) => {
    try {
        const result = await messageService.createChatRoom(req.body, req.user);
        console.log('result: ', result);
        return res.status(200).json({ message: result.message, chatRoom: result.chatRoom });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const getChatRoomsController = async (req: Request, res: Response) => {
    try {
        const result = await messageService.getChatRooms(req.user);
        return res.status(200).json({ message: result.message, chatRooms: result.chatRooms });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const getChatRoomMessagesController = async (req: Request, res: Response) => {
    try {
        const result = await messageService.getChatRoomMessages(req.body?.chatRoomId, req.user);
        return res.status(200).json({ message: result.message, messages: result.messages });
    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}

export const sendChatRoomMessagesController = async (req: Request, res: Response) => {
    try {
        const { chatRoomId, messageBody } = req.body;
        const result = await messageService.sendChatRoomMessages({ chatRoomId, messageBody }, req?.user);

        if (result.message == SUCCESS_TYPES.DEFAULT_SUCCESS.message) {
            const io = initSocketServer();
            io.to(chatRoomId).emit("newMessage", {
                message: result.newMessage,
                chatRoomId: chatRoomId,
                sentByUserId: req?.user?._id,
                timestamp: result?.newMessage?.timestamp
            });
        }

        return res.status(200).json({ message: result.message, newMessage: result.newMessage });

    } catch (error) {
        return res.status(500).json({ message: ERROR_TYPES.INTERNAL_SERVER_ERROR, error });
    }
}