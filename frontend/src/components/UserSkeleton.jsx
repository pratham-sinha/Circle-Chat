import React from 'react'
import {Users} from "lucide-react"
function UserSkeleton() {
    const skeleton=Array(8).fill(null);
    return (
        <aside className='h-full w-20 lg:w-70 '>
         <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center gap-2">
          <Users className="w-6 h-6" />
          <span className="font-medium hidden lg:block">Contacts</span>
        </div>
      </div>


<div className='overflow-y-auto' >

      
      {
        skeleton.map((_ , idx)=>(
          <div key={idx} className='flex gap-3'>
            <div className="ml-2">
              <div className="skeleton size-12 rounded-full m-3" />
            </div>

            <div className="mt-7">
              <div className="skeleton h-4 w-32 mb-2" />
            </div>
          </div>

          
        ))
      }

      </div>
    </aside>
    
  )
}

export default UserSkeleton
