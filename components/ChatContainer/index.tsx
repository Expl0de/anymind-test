import { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../contexts/AppContext';
import { getLatestMessagesFromChannel, getMoreMessagesFromChannel, postMessage } from '../../services/messageService';
import type { NextPage } from 'next'
import { Button, Input } from 'antd';
import Avatar from '../Avartar';
import moment from 'moment';
import { ChatBubbleProps, ReadMoreButtonProps, MessageType } from '../../types/appTypes'
import { CloseCircleOutlined, CheckCircleOutlined, SendOutlined, CaretUpOutlined, CaretDownOutlined, CaretLeftOutlined, CaretRightOutlined} from '@ant-design/icons'
import styles from './styles/ChatContainer.module.scss' 

//TODO: Refacture to seperate component
const ReadMoreButton: NextPage<ReadMoreButtonProps> = (props) => {
  const { previous, fetchMoreMessage } = props
  return(
    <div className={`${styles.chatRow} ${styles.loadMoreButtonWrapper}`}>
      <Button type="primary" onClick={fetchMoreMessage} >
        Read More
        {
          previous?
          <CaretUpOutlined />
          :<CaretDownOutlined />
        }
      </Button>
    </div>
  )
}

//TODO: Refacture to seperate component
//Chat Bubber Type
const ChatBubble: NextPage<ChatBubbleProps> = (props) => {
  const { chatData, isSelf = false } = props
  const datetime: string = moment(chatData.datetime).format("HH:mm")
  function classChecker (isSelf :boolean) :string {
    return isSelf?`${styles.chatRow} ${styles.chatBubbleRow} ${styles.chatRightBubbleRow}`:`${styles.chatRow} ${styles.chatBubbleRow} ${styles.chatLeftBubbleRow}`
  }

  return(
    <div className={classChecker(isSelf)}>
      <div className={styles.profileWrapper}>
        <Avatar name={chatData.username} />
        <div>{chatData.username}</div>
      </div>
      <div className={styles.chatBubbleWrapper}>
        <div className={styles.chatBubbleTriangle}>
          {
            isSelf?
            <CaretRightOutlined />
            :<CaretLeftOutlined />
          }
        </div>
        <div className={styles.chatBubbleContainer}>
          {chatData.text}
        </div>
      </div>
      {
        isSelf?      
        <div className={styles.sendStatus}>
          {
            chatData.failed?
            <>
              <CloseCircleOutlined style={{color:'red'}} />
              <span>Error</span>
            </>
            :<>
              <CheckCircleOutlined style={{color:'green'}} />
              <span>Sent</span>
            </>
          }
        </div>
        :null
      }
      <div className={styles.chatTimeWrapper}>
        {datetime}
      </div>
    </div>
  )
}

const ChatContainer: NextPage = () => {
  const { TextArea } = Input;
  const { 
    username, 
    channel, 
    messages, 
    handleSetMessages, 
  } = useContext(AppContext)
  const [inputText, setInputText] = useState("")
  
  useEffect(()=>{
    const draftMessage = window.localStorage.getItem("draftMessage")!
    setInputText(draftMessage)
  },[])

  useEffect(()=>{
    fetchMessage()
  },[channel])

  useEffect(()=>{
  },[messages])

  async function fetchMessage(){
    const data = await getLatestMessagesFromChannel(channel)
    handleSetMessages(data)
  }

  async function fetchMoreMessage(){
    if(messages.length > 0){
      const oldestMessage = messages[0]
      const data = await getMoreMessagesFromChannel(channel, oldestMessage.messageId!)
      const tempMessages = [...data, ...messages]
      handleSetMessages(tempMessages)
    }
  }

  function handleInputTextChange(val: string){
    setInputText(val)
    window.localStorage.setItem("draftMessage", val)
  }

  async function handleSendClick(){
    const messageResult = await postMessage({
      userId: username,
      text: inputText,
      channelId: channel
    })
    if(messageResult){
      const tempMessages = [...messages, messageResult]
      handleSetMessages(tempMessages)  
    }
    handleInputTextChange("")
  }

  const messageElement = messages.map((val: MessageType, index: number)=>(
    <ChatBubble 
      key={index}
      isSelf={val.userId===username}
      chatData={{
        username: val.userId,
        datetime: moment(val.datetime).toDate(),
        text: val.text,
        failed: val.failed
      }}
    />
  ))

  return (
    <div className={styles.container}>
      <div className={styles.channelTitle}>{channel}</div>
      <div className={styles.chatBodyWrapper}>
        <ReadMoreButton previous={true} fetchMoreMessage={fetchMoreMessage} />
        {messageElement}
        {/* Always fetch latest message */}
        {/* <ReadMoreButton previous={false}  /> */}
      </div>
      <div className={styles.textAreaWrapper}>
          <TextArea onChange={(e)=>handleInputTextChange(e.target.value)} value={inputText} />
          <Button 
            className={styles.sendButton} 
            type="primary"  
            onClick={handleSendClick}
          >
            Send Message
            <SendOutlined />
          </Button>
      </div>
    </div>
  )
}

export default ChatContainer
