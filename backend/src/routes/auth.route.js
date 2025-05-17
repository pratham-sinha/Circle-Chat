import express from "express"
import { login, logout, signup, updateProfile , checkAuth} from "../controllers/auth.controller.js"
import { protectRoute } from "../middlewares/auth.middleware.js"

const router=express.Router()

router.post("/signup",signup)
//signup function coming from controller
//it could be written as
// router.post("/signup",(req,res)=>{
//     res.send("SIGNUP ROUTE")
//     {or whatever business logic}
// })

router.post("/login",login)

router.post("/logout",logout)

router.put("/update-profile", protectRoute,updateProfile)
//protectRoute is a middleware which checks if user is authenticated to change pfp
//then it will call updateProfile

router.get("/check",protectRoute,checkAuth)

export default router;