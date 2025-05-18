import React, { useEffect,useRef } from 'react'
import ChatSkeleton from './ChatSkeleton.jsx';
import ChatHeader from './ChatHeader.jsx';
import MessageInput from './MessageInput.jsx';
import { useAuthStore } from '../store/useAuthStore.js';
import { useChatStore } from '../store/useChatStore.js'
import {UTC2IST} from '../utils/timeConversion.js'
import { Download } from 'lucide-react';


function ChatBox() {
  
  const {messages,getMessages,selectedUser,areMessagesLoading,subscribeToRealTimeMessages,unsubscribeFromRealTimeMessages}=useChatStore();
  const {authUser}=useAuthStore();
  
  useEffect(()=>{
    if(selectedUser){
    getMessages(selectedUser._id);
    subscribeToRealTimeMessages();
    }
    return ()=>unsubscribeFromRealTimeMessages();
  },[selectedUser,getMessages,subscribeToRealTimeMessages])

  const chatEndRef=useRef(null);
  useEffect(()=>{
    if(chatEndRef.current && messages){
    chatEndRef.current.scrollIntoView({behaviour:"smooth"});
    }
  },[messages]);


  
  let prevDate="99/99/9999";
  

  if(areMessagesLoading)return(
    
    <ChatSkeleton/>
  )
  if(selectedUser==null){
    return
  }
  return (    
  <div className="flex-1 mt-12 flex flex-col ">
        <ChatHeader/>
      <div className='flex-1  overflow-y-auto p-4 space-y-4 '>
        {messages?.map((message)=>{

        let isDateChanged=false;
        const {date,time}=UTC2IST(message.createdAt);
         if(date!=prevDate || prevDate=="99/99/9999"){
             prevDate=date;
             isDateChanged=true;
         }
        return(
          <div key={message._id} ref={chatEndRef}>
          
          {isDateChanged && (
             <div className='flex justify-center items-center'>
              <span className='text-center rounded w-22 text-amber-100 text-xs  font-mono font-semibold'>{date} </span>
              </div>
          )
          }

          <div
          className={`chat ${message.senderId===authUser._id? "chat-end":"chat-start"} `}
          >
            <div className='chat-image avatar'>
                <div className='size-10 rounded-full border'>
                   <img src={message.senderId===authUser._id ?
                    authUser?.profilePic  || "./src/assets/avatar.png ": selectedUser?.profilePic||"./src/assets/avatar.png"
                   } alt="profilepic" />
                </div>
            </div>
             

            <div className="chat-header mb-1 ">
           

              <time className="text-xs opacity-50 ml-1">
                {UTC2IST(message.createdAt).time}
              </time>
            
             
            </div>
            <div>
               


            <div className="chat-bubble flex flex-col rounded-3xl text-zinc-900 font-sans font-semibold" style={!message.image ?  { background: 'linear-gradient(90deg, rgba(253,127,137,1) 0%, rgba(255,92,92,1) 50%, rgba(252,175,77,1) 100%)' }:undefined}>
              {message.image && (
                <>
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-3xl m-0 p-0"
                  />
                  {message.senderId!=authUser._id && <a
       href={message.image.replace('/upload/', '/upload/fl_attachment/')}
      download
      className="absolute bottom-0 right-0  bg-white p-1 rounded-sm opacity-60 text-black hover:bg-gray-800 hover:text-white transition duration-200"
      title="Download image"
    >
      <Download className=' transition duration-200'/>
    </a>
        }
                  </>
              )
              }
              {message.text && <p>{message.text}</p>}
            </div>
            </div>
          </div>
          </div>
        )})}
      </div>
      <div className='mb-10'>

        <MessageInput/>

      </div>
    </div>
  )
}

export default ChatBox
