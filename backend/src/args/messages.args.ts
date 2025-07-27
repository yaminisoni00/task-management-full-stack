export interface CreateChatRoomArgs {
    chatRoomMemberId: string;
    teamId?: string;
}

export interface GetChatRoomMessagesArgs {
    chatRoomId: string;
}

export interface SendChatRoomMessagesArgs {
    chatRoomId: string;
    messageBody: string;
}