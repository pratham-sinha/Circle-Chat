import {  X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { useChatStore } from "../store/useChatStore.js";


import React, { useEffect } from 'react'

function ChatHeader() {
  
  const {selectedUser,setSelectedUser}=useChatStore();
   const {onlineUsers,lastSeenMap} =useAuthStore();
  console.log(lastSeenMap[selectedUser._id]);
  console.log(selectedUser);
  
  
  return (
    
    <div className="m-0 p-1.5 border-b border-base-300 ">
      <div className="flex items-center justify-between">


        <div className="flex items-center gap-3">
          {/* Avatar */}
           <div className="size-10 ">
              <img src={selectedUser?.profilePic || "./src/assets/avatar.png"} alt={"PRATHAM"} className="rounded-full" />
           </div>
          

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser?.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" :`Last active: ${lastSeenMap[selectedUser._id] || selectedUser.lastSeen}`}
            </p>                                                                   {/*  real time update             from DB       */}
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className="hover:cursor-pointer">
          <X />
        </button>
      </div>
    </div>
  )
}

export default ChatHeader
