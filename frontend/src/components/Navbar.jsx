
import { useAuthStore } from '../store/useAuthStore'
import { LogOut,UserPen } from 'lucide-react';
import {Link} from "react-router-dom"

function Navbar() {
    const {logout,authUser}=useAuthStore();

  return (
    <header className='backdrop-blur-md h-12 m-0  w-full flex items-center justify-between bg-zinc-900 border-b-2 border-base-100 fixed '>

      <Link to="/" >

      <div className='flex items-center m-2'>
        <img src=".\src\assets\logoNoName.png" alt="" className='h-11 w-auto  m-2 transition-all duration-200 active:scale-95 hover:animate-pulse'  />
      </div>
      </Link>
      <div className='flex items-center space-x-4 mr-4'>
        

        {authUser &&(
            <>
        <button onClick={logout} className='transition hover:cursor-pointer active:scale-95 bg-slate-700 w-11 h-9 flex justify-center items-center rounded-sm p-2' >
        <div className='transition hover:scale-95'>
        <LogOut/>
        </div>

        </button>
        <Link to="/profile">
        <button className='transition hover:cursor-pointer active:scale-95 bg-slate-700 w-11 h-9 flex justify-center items-center rounded-sm p-2'>
            <div className='transition hover:scale-95'>

           <UserPen/>
            </div>
        </button>
        
        </Link>
        </>
        )}
      </div>

    </header>
  )
}

export default Navbar
