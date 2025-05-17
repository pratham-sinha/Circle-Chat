import {React,useState} from 'react'
import { Mail,KeyRound,Eye,Loader2} from 'lucide-react';
import { Link } from "react-router-dom";
import { useAuthStore } from '../store/useAuthStore';


function LoginPage() {

     const [showPassword,setShowPassword]=useState(true);
     const [userData, setUserData] = useState({
      email: "",
      password: "",
    });
    const { login, isLoggingIn } = useAuthStore();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      login(userData);
    };
  return (
     <div className='min-h-screen flex flex-col lg:flex-row  lg:items-center lg:grid lg:grid-cols-2 bg-neutral-900 '>
        <div className='flex justify-center items-center'>
          <img src="src\assets\logo.png" alt="" className='w-50 h-50 mt-9 lg:w-60 lg:h-60' />
        </div>
    
        <div className='flex flex-col justify-center items-center space-y-5'>
          <h2 className='text-2xl bg-gradient-to-tl bg-white bg-clip-text text-transparent font-mono font-semibold'>Login</h2>
    
    
           <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-3 w-full'>
            
           
          
    
         
           <label className="input">
             <input type="email" 
             placeholder="Enter email address"
              required 
              value={userData.email}
              onChange={(e) => setUserData({ ...userData, email: e.target.value})}
              />
             <Mail/>
           </label>
          
      <label className="input">
     
      <input
        type={!showPassword ? "text" : "password"}
        required
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

    <button type="submit" className="btn btn-active btn-primary hover:bg-violet-600 hover:scale-102 transition-all duration-200" disabled={isLoggingIn}>
  {isLoggingIn? (
    <>
    <Loader2 className='size-5 animate-spin'/>
    Loading...
    </>
  ):(
    <>
    Log in
    </>
  )}
 
</button>

</form>


        <div className="text-center">
        <p className="text-base-content/60">Don't have an account?{" "} 
          <Link to="/signup" className="link link-primary">Sign up</Link>
        </p>
       </div>
        </div>
        </div>


      )
}

export default LoginPage
