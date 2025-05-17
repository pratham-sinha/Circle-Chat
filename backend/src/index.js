import express from "express"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import cors from "cors";

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.routes.js"
import { connectDB } from "./db/db.js";
import {app,server} from "./utils/socket.js"

dotenv.config()


const PORT=process.env.PORT

app.use(express.json({ limit: '10mb' }))//to extract JSON data out of body

app.use(express.urlencoded({ limit: '10mb', extended: true }));

app.use(cookieParser())

app.use(
    cors({
      origin: "http://localhost:5173",
      credentials: true,
    })
);



app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

server.listen(PORT,()=>{
  console.log(`HELLOoooo from port ${PORT}`)
  connectDB()
})



