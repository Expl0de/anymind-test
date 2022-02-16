import React, {createContext, useState, FC} from 'react'
import { MessageType, AppStateType, UserId, ChannelId} from '../types/appTypes'

const defaultFunction = () => {}
//TODO: Refactor this into seperate service
const defaultState: AppStateType = {
    users: ["Sam", "Russell", "Joyse"],
    username: "Sam",
    channel: "General",
    channels: ["General", "Technology", "LGTM"],
    messages: [],
    handleSetUsername: defaultFunction,
    handleSetChannel: defaultFunction,
    handleSetMessages: defaultFunction
};

export const AppContext = createContext<AppStateType>(defaultState);

export const AppProvider: FC = ({ children }) => {
    const [username, setUsername] = useState(defaultState.username);
    const [channel, setChannel] = useState(defaultState.channel);
    const [messages, setMessages] = useState<MessageType[]>(defaultState.messages);

    const handleSetUsername = (val: UserId) => {
      setUsername(val)
    }

    const handleSetChannel = (val: ChannelId) => {
      setChannel(val)
    }

    const handleSetMessages = (val: MessageType[]) => {
      setMessages(val)
    }

    return (
      <AppContext.Provider
        value={{
            users: defaultState.users,
            username,
            channels: defaultState.channels,
            channel,
            messages,
            handleSetChannel,
            handleSetUsername,
            handleSetMessages,
        }}
      >
        {children}
      </AppContext.Provider>
    );
  };

