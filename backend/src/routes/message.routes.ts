import express from "express";
import { createChatRoomController, getChatRoomMessagesController, getChatRoomsController, sendChatRoomMessagesController } from "src/controllers/message.controller";
import { authenticateUser } from "src/middlewares/auth.middleware";

const router = express.Router();

// router.use(authenticateUser);

router.post("/createChatRoom", createChatRoomController);
router.get("/getChatRooms", getChatRoomsController);
router.post("/getChatRoomMessages", getChatRoomMessagesController);
router.post("/sendChatRoomMessages", sendChatRoomMessagesController);

export default router;