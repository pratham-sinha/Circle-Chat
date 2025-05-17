import User from "../models/user.model.js";
import Message from "../models/message.model.js"
import cloudinary from "../utils/cloudinary.js";

import { getReceiverSocketId,io } from "../utils/socket.js"; 


export const getUsers=async(req,res)=>{
    try{
        const myId=req.user.id;
        const people=await User.find({_id:{$ne:myId}}).select("-password");

        res.status(200).json(people);

    }
    catch(error){
      console.log("Error in getting users", error.message);
      res.status(500).json({message:"Internal server error"});
      
    }
}


export const getMessages=async(req,res)=>{
    try{
        const {id:friendId}=req.params
        const myId=req.user._id;
        const messages=await Message.find({
        $or:[
            {senderId:myId,receiverId:friendId},
            {senderId:friendId,receiverId:myId}
        ]
        })
        res.status(200).json(messages)
    }
    catch(error){
         console.log("Error in fetching messages", error.message);
         res.status(500).json({message:"Internal Server Error"})
    }
}


export const sendMessage=async(req,res)=>{
  try{
     const {text,image}=req.body
     const {id:receiverId}=req.params
     const senderId = req.user._id;
     let imageUrl;
     if(image){
       const uploadResponse=await cloudinary.uploader.upload(image)
       imageUrl=uploadResponse.secure_url;
     }

     const newMessage=new Message({
        senderId,
        receiverId,
        text,
        image:imageUrl
     })

     await newMessage.save();

     //real time (socket.io)
     const receiverSocketId=getReceiverSocketId(receiverId);
     
     //if receiver is online => real time emit
     if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
     }



     res.status(201).json(newMessage);
  } 
  catch(error){
    console.log("Error in sending message", error.message);
    res.status(500).json({message:"Internal Server Error"})
  }
}