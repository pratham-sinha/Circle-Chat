import React, { useState,useRef, useEffect } from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import {User,Mail,Camera} from "lucide-react"
import {UTC2IST} from '../utils/timeConversion.js'
 import domtoimage from 'dom-to-image-more';



const ProfilePage = () => {
  const {authUser,isUpdatingPfp,updatePfp}=useAuthStore();
  const [pfp,setPfp]=useState(null)
  const avatar="https://cdn-icons-png.flaticon.com/512/6522/6522516.png";
  
  const handleImageUpload=async(e)=>{
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    
    reader.onloadend=async () => {
      const pfpURL = reader.result;
      setPfp(pfpURL);
      console.log("inside onloadend");
      
      
      await updatePfp({ profilePic: pfpURL });
    };
    reader.readAsDataURL(file);
  }
  const memberSince=UTC2IST(authUser?.createdAt).date;

 

  console.log(authUser);















  return (
    <div className='flex justify-center items-center'>
      <div className='mt-20 relative  flex flex-col  justify-center items-center bg-neutral-900 border-2 w-120 h-130 ' >
        <img
          
          src=".\src\assets\logo.png"
          alt="Hidden Logo"
          className="absolute top-2 left-2 w-20 h-20 opacity-100 transition-opacity duration-200"
        />
        <p className='mb-2 font-semibold font-mono'>Your Profile</p>
        <div className='relative'>

          <img src={pfp || authUser.profilePic || avatar} alt="" className='size-32 rounded-full object-cover border-4 border-rose-200' />
          <label
                htmlFor="avatar-upload"
                className={`
                  absolute bottom-0 right-0 
                  bg-white hover:scale-105
                  p-2 rounded-full cursor-pointer 
                  transition-all duration-200
                  ${isUpdatingPfp ? "animate-pulse pointer-events-none" : ""}
                  `}
                  >
                <Camera className="w-5 h-5 text-black" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                   onChange={handleImageUpload}
                  disabled={isUpdatingPfp}
                  />
              </label>
                  </div>
                <p className='text-sm font-mono text-zinc-400 mt-1'>
                  {isUpdatingPfp? "Uploading..." : ""}
                </p>

          <div className="space-y-6 w-[100%] flex  flex-col justify-center items-center">
            <div className="space-y-1.5 w-[50%] ">
              <div className="text-sm text-zinc-400 flex items-center gap-2 mt-5">
                <User className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-200 rounded-lg border w-[100%]">{authUser.fullName}</p>
            </div>

            <div className="space-y-1.5 w-[50%] ">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </div>
              <p className="text-sm px-4 py-2.5 bg-base-200 rounded-lg border">{authUser?.email}</p>
            </div>
          </div>
          <div className='font-mono font-semibold mt-4 flex flex-col justify-center items-center '>
            <p>

          On Circle since
            </p>
           <p>

           {memberSince}
           </p>

          </div>
      </div>
       
    </div>
  )
}

export default ProfilePage
