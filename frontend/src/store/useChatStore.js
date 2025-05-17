import { create } from "zustand";
import toast from "react-hot-toast"
import { axiosInstance } from "../axios/axios";
import {useAuthStore} from "./useAuthStore.js"


export const useChatStore=create((set,get)=>({

    messages:[],
    users:[],
    selectedUser:null,
    areUsersLoading:false,
    areMessagesLoading:false,



    getUsers:async()=>{
        set({areUsersLoading:true});
        try{
           const res=await axiosInstance.get("/messages/users")
           set({users:res.data});
        }
        catch(error){
             toast.error(error.response.data.messaege);
        }
        finally{
            set({areUsersLoading:false});
        }
    },

    getMessages:async(userId)=>{
        set({areMessagesLoading:true});
        try{
           const res=await axiosInstance.get(`/messages/${userId}`)
           set({messages:res.data});
        }
        catch(error){
             toast.error(error.response.data.messaege);
        }
        finally{
            set({areMessagesLoading:false});
        }
    },
    sendMessage:async (messageData)=>{
        const {selectedUser,messages}=get();
        try{
          const res=await axiosInstance.post(`/messages/send/${selectedUser._id}`,messageData);
          set({messages:[...messages,res.data]});
        }
        catch(error){
          toast.error(error.response.data.message);
        }

    },

    subscribeToRealTimeMessages:()=>{
        const {selectedUser}=get();
        if(!selectedUser)return;
        const socket=useAuthStore.getState().socket;
        socket.on("newMessage",(newMessage)=>{
            
            if(newMessage.senderId!=selectedUser._id)return
            //if this condition not given the real time message will be updated for all 
            //user but on re render when fetching from database only proper msg will be shown

            set({messages:[...get().messages,newMessage]}) 
        })
    },

    unsubscribeFromRealTimeMessages:()=>{
        const socket=useAuthStore.getState().socket;
        socket.off("newMessage");

    },



    setSelectedUser: (selectedUser) => set({ selectedUser }),

}))