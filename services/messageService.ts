import axios from 'axios'
import { PostMessageType } from '../types/appTypes';

const URL = 'https://angular-test-backend-yc4c5cvnnq-an.a.run.app/graphql'

export async function getLatestMessagesFromChannel(channel: string){
  const query = `
    {
      MessagesFetchLatest(channelId: ${channel}){
        messageId
        text
        datetime
        userId
      }
    }
  `
  try{
    const { data } = await axios.post(URL,{
      query
    })
    const res = data.data
    const messages = res.MessagesFetchLatest
    return messages.reverse()
  }
  catch(error){
    //TODO: Handle all other error 
    return[]
  }
}

export async function getMoreMessagesFromChannel(channel: string, messageId: string){
  const query = `
    {
      MessagesFetchMore(channelId: ${channel}, messageId: "${messageId}", old: true){
        messageId
        text
        datetime
        userId
      }
    }
  `
  try{
    const { data } = await axios.post(URL,{
      query
    })
    const res = data.data
    const messages = res.MessagesFetchMore
    return messages.reverse()
  }
  catch(error){
    //TODO: Handle all other error 
    return[]
  }
}

export async function postMessage(variables: PostMessageType){
  const query = `
    mutation MessagePost($channelId: ChannelId!, $text: String!, $userId: UserId!) {
      MessagePost(channelId: $channelId, text: $text, userId: $userId){
        messageId
        text
        datetime
        userId
      }
    }
  `
  try{
    const { data } = await axios.post(URL,{
      query,
      variables
    })
    const res = data.data
    if(res.MessagePost===null) throw "null";
    return res.MessagePost
  }
  catch(error){
    //TODO: Handle Error
    return {
      ...variables,
      failed: true
    }
  }
}