import {Server} from "socket.io"
import http from "http"
import express from "express"
import User from "../models/user.model.js";

const app=express()
const server=http.createServer(app)

const io=new Server(server,{
    cors:{
        origin:["http://localhost:5173"]
    }
});

export function getReceiverSocketId(userId){
  return userSocketMap[userId];
}

const userSocketMap={}//{userId:socketId}
const lastSeenSocketMap={};//{userId:timestamp}


io.on("connection",(socket)=>{

    console.log("A user connected",socket.id);

    const userId=socket.handshake.query.userId;

    if(userId){
      userSocketMap[userId]=socket.id;
    }
    io.emit("getOnlineUsers",Object.keys(userSocketMap));
  


    socket.on("disconnect",async ()=>{
        delete userSocketMap[userId];

        //we have deleted user from map but what if 
        //user is refreshing(socket considers refreshing as a disconnection) the page or again connects after a
        //short duration 
        //so we use set a time out for 10s , if the user reconnects we will return
        //else we will go on to update online status and last seen
        setTimeout(async()=>{
              if(userSocketMap[userId]){
                return;
              }

              console.log("A user disconnected", socket.id);
              delete userSocketMap[userId];
              io.emit("getOnlineUsers",Object.keys(userSocketMap));


               const now = new Date();
               const options = {
                 year: 'numeric',
                 month: 'short',    // or 'long' or '2-digit'
                 day: 'numeric',
                 hour: 'numeric',
                 minute: '2-digit',
                 hour12: true
               };

            const currentTime = now.toLocaleString('en-US', options);
            lastSeenSocketMap[userId]=currentTime;
             try {
                await User.findByIdAndUpdate(userId, { lastSeen: currentTime });
                console.log(`Updated last seen for user ${userId}`);
              } catch (err) {
                console.error("Error updating last seen:", err);
              }
             io.emit("getLastSeen",lastSeenSocketMap);
        
              
        },10000)
       

         

   
        

    })


})



export {io,app,server}