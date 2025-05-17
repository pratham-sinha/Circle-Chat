import {React, useEffect, useState } from 'react'
import HomePage from './pages/HomePage.jsx'
import SignUpPage from './pages/SignUpPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { Route, Routes ,Navigate} from 'react-router-dom'
import { useAuthStore } from './store/useAuthStore.js'
import { Loader } from 'lucide-react'
import Navbar from './components/Navbar.jsx'


function App(){

  const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
   useEffect(()=>{
    checkAuth();
   },[checkAuth])

   console.log({authUser});

   if(isCheckingAuth && !authUser) return (
     <div className='flex justify-center items-center h-screen'>
       <Loader className='size-10 animate-spin'/>
     </div>
   )



  return (
     <div className="h-screen overflow-hidden  bg-neutral-900 ">
       
<Navbar/>
       <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
     
     </div>
  )
}

export default App
