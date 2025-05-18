import {React,useState} from 'react'
import { Mail ,User,KeyRound,Eye, Loader2} from 'lucide-react';
import { useAuthStore } from '../store/useAuthStore';
import {toast} from "react-hot-toast"
import {Link} from "react-router-dom"

const SignUpPage = () => {
   
   const [showPassword,setShowPassword]=useState(false);
   const [userData,setUserData]=useState({
    fullName:"",
    email:"",
    password:"",
   });
   const {authUser,signUp,isSigningUp} =useAuthStore();

   const validateField=()=>{
     console.log("validating");
     
    
    if (!userData.fullName.trim()) return toast.error("Full name is required");
    
    if (!userData.email.trim()) return toast.error("Email is required");

    if (!userData.password) return toast.error("Password is required");
    if (userData.password.length < 8) return toast.error("Password must be at least 8 characters");
    return true;
   };

   const handleSubmit=(e)=>{

    e.preventDefault();
    console.log("submitting");
    const success=validateField();
    if (success===true) {
      signUp(userData);
      console.log("success",{authUser});
    }

   }

  console.log(userData);
  


  return (

    

    
    <div className='min-h-screen flex flex-col lg:flex-row  lg:items-center lg:grid lg:grid-cols-2 bg-neutral-900'>

    <div className='flex justify-center items-center motion-safe:animate-pulse'>
      <img src="src\assets\logo.png" alt="" className='w-50 h-50 mt-9 lg:w-60 lg:h-60' />
    </div>

    <div className='flex flex-col justify-center items-center space-y-5'>
      <h2 className='text-2xl bg-white bg-clip-text text-transparent font-mono font-semibold'>Create Account</h2>


       <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-3 w-full'>
        
       
       <label className="input">
         <input
          type="input"
          
          placeholder="Full name"
         
          value={userData.fullName}
          onChange={(e)=>setUserData({...userData,fullName:e.target.value})}
        />
         <User/>
         </label>

     
       <label className="input">
         <input type="email"
          placeholder="Email address" 
          
         value={userData.email}
         onChange={(e) => setUserData({ ...userData,email:e.target.value })}
         />
         <Mail/>
       </label>
      


    

       <label className="input">
         <input
          type={!showPassword? "text":"password"}
          
          placeholder="Password"
          
          value={userData.password}
          onChange={(e)=>setUserData({...userData,password:e.target.value})}   
        />

<button type="button"
        className="absolute inset-y-0 right-3 hover:cursor-pointer"
        onClick={() => setShowPassword(!showPassword)}
>

  {
    !showPassword?
  <KeyRound/>:
  <Eye/>
  }



</button>


</label>

  
<button type="submit" className="btn btn-active btn-primary hover:bg-violet-600 hover:scale-102 transition-all duration-200" disabled={isSigningUp}>
  {isSigningUp? (
    <>
    <Loader2 className='size-5 animate-spin'/>
    Loading...
    </>
  ):(
    <>
    Sign Up
    </>
  )
  
}
 
</button>



       </form>

       <div className="text-center">
        <p className="text-base-content/60">Already have an account?{" "} 
          <Link to="/login" className="link link-primary">Login</Link>
        </p>
       </div>
    </div>
    </div>
  )
}

export default SignUpPage
