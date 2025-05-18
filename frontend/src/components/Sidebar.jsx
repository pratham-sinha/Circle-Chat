import React, {  useEffect, useState } from 'react'
import { useChatStore } from '../store/useChatStore.js'
import { useAuthStore } from '../store/useAuthStore.js';
import UserSkeleton from './UserSkeleton';
import { Search } from 'lucide-react';


function Sidebar() {
    const {getUsers,users,selectedUser,setSelectedUser,areUsersLoading}=useChatStore();
    const {onlineUsers}=useAuthStore();
    
    const [query,setQuery]=useState();
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) setIsSearchOpen(false); // reset on desktop
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

    const searchUser=(e)=>{
      setQuery(e.target.value);
    }
    let filteredUsers=query? users.filter((currUser)=>{
      return currUser.fullName.toLowerCase().includes(query)
    }):users;

    useEffect(()=>{
       getUsers()
    },[getUsers])

    if(areUsersLoading)return <UserSkeleton/>
  return (
     <aside className=' w-22 lg:w-70 flex flex-col mt-12 border-r border-slate-400 bg-neutral-950  '>
      

      


     <div className=" w-full ">
      <div className="w-full flex ">
       
       {isMobile ? (
        <div className="w-full h-15 flex justify-center items-center ">
          {!isSearchOpen ? (
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-2 rounded-full bg-zinc-500 text-white shadow size-10 text-center"
            >
              <Search className='text-center' />
            </button>
          ) : (
            <input
              type="text"
              autoFocus
              placeholder=""
              
              onChange={searchUser}
              className="w-full  px-4 py-2  border border-zinc-500 rounded-full focus:outline-none focus:ring-2 focus:ring-zinc-400 placeholder:text-gray-400"
            />
          )}
        </div>
      ) : (

       
      <div className='mt-5  flex justify-center items-center h-4 ml-5'>
        <Search className='h-5 w-5 mr-2'/>
        <input type="text" placeholder='Search...' onChange={searchUser} className='border-1 p-5 rounded-4xl border-zinc-600 outline-0 h-10'/>
        
       
      </div>
      )}
    </div>
  </div>
 <div className=" overflow-y-auto w-full py-3 mt-2">
     
   {
    
    filteredUsers.map((user)=>(
       
      
     
        <button
        key={user._id}
        onClick={()=>setSelectedUser(user)}
        className={`w-full p-3 flex items-center gap-3 border-b border-zinc-700
              hover:bg-base-200 transition-colors hover:cursor-pointer  ${selectedUser?._id === user._id ? "bg-base-300 ring-1 ring-base-300" : ""}`}
        >
        <div className='relative mx-auto lg:mx-0'>
            <img src={user.profilePic ||  "./src/assets/avatar.png"} alt="user.fullName" className='rounded-full size-12' />
            {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
            />
              )}

            </div>
            <div className="hidden lg:block ">
              <div className="font-medium text-left">{user.fullName}</div>
              <div className="text-sm text-left text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
        </button>
        
    ))
   }
 </div>


  </aside>
  )
}

export default Sidebar
