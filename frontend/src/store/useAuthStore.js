import{create} from "zustand";
import {axiosInstance} from "../axios/axios.js";
import toast from "react-hot-toast";
import {io} from "socket.io-client";

const BASE_URL="http://localhost:5001"


export const useAuthStore=create((set,get)=>({
    
    
    authUser:null,
    isSigningUp:false,
    isLoggingIn:false,
    isUpdatingPfp:false,
    isCheckingAuth:true,
    onlineUsers:[],
    lastSeenMap:{"abc":"def"},
    socket:null,

    checkAuth:async()=>{
        try{
            const res=await axiosInstance.get("/auth/check");
            set({authUser:res.data});

            get().connectSocket();
        }
        catch(error){
            console.log("Error in check auth auth ", error)
            set({authUser:null});
        }
        finally{
            set({isCheckingAuth:false});
        }
    },
    signUp:async(data)=>{
       
        set({ isSigningUp: true });
        try {
            const res = await axiosInstance.post("/auth/signup", data);
            set({ authUser: res.data });
            toast.success("Account created successfully");
            

            get().connectSocket();
            
        } catch (error) {
          toast.error("Error");
        } finally {
            
            set({ isSigningUp: false });
        }
    },
    login:async(data)=>{
        set({ isLoggingIn: true });
        try {
            const res = await axiosInstance.post("/auth/login", data);
            set({ authUser: res.data });
            toast.success("Logged in successfully");
            
            get().connectSocket();
            
        } catch (error) {
          toast.error("Invalid credentials");
        } finally {
            
            set({ isLoggingIn: false });
        }
    },
    logout:async()=>{
        try{

            
            await axiosInstance.post("/auth/logout");
          
            set({authUser:null});
           



            toast.success("Logged out successfully")
            get().disconnectSocket();
        }
        catch(error){
            toast.error(error.response.data.message);
        }
    },
     //pfp comes as a link
   updatePfp:async(data)=>{
        console.log("Inside");
        
        set({ isUpdatingPfp: true });
        try {
          const res = await axiosInstance.put("/auth/update-profile", data);
          set({ authUser: res.data });
          toast.success("Profile updated successfully");
        } catch (error) {
          console.log("error in update profile:", error);
          toast.error(error.response.data.message);
        } finally {
          set({ isUpdatingPfp: false });
        }
    },

    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected){
            return;
        }
        const socket=io(BASE_URL,{
            query:{
              userId:authUser._id,
            },
        });
           
         socket.connect();
         set({socket:socket})

         socket.on("getOnlineUsers",(userIds)=>{
                set({onlineUsers:userIds});
         })

         //this socket is for client when user connects they will get the last seens of everyone
         socket.on("getLastSeen",(lastSeens)=>{
             set({lastSeenMap:lastSeens})
          })
          //intially I was putting this into disconnectSocket() as last seen should be updated when user disconnects
          //but that logic is written at server side in socket.js

         
    },
    disconnectSocket:()=>{
        if(get().socket?.connected)get().socket.disconnect();
    }


}))