export type UserId = "Sam" | "Russell" | "Joyse"
export type ChannelId = "General" | "LGTM" | "Technology"
export interface MessageType {
    messageId?: string, 
    userId: string,
    datetime?: Date,
    text: string,
    failed?: boolean
}
export interface PostMessageType {
    channelId?: ChannelId, 
    text: string,
    userId?: UserId
}
export interface AppStateType {
    users: string[],
    username: UserId,
    channels: string[],
    channel: ChannelId,
    messages: MessageType[],
    handleSetUsername: (name: UserId)=> void,
    handleSetChannel: (channel: ChannelId)=> void,
    handleSetMessages: (messages: MessageType[])=> void,
}
export interface ChatBubbleProps {
    isSelf?: boolean,
    chatData:{
      username: string,
      datetime: Date,
      text: string,
      failed: boolean | null | undefined //Return data from server will be undefined
    }
}
export interface ReadMoreButtonProps {
    previous: boolean;
    fetchMoreMessage: ()=> void;
}