import React from 'react'
import {useChatStore} from "../store/useChatStore.js"
import Sidebar from '../components/Sidebar.jsx';
import ChatBox from '../components/ChatBox.jsx';

function HomePage() {
   const {selectedUsers}=useChatStore();


  return (
    <div className="flex h-full ">
      <Sidebar/>
      <ChatBox/>
    </div>
  )
}

export default HomePage
