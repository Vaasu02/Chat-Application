import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import { connectDB } from "./db/connectDB.js";
import cookieParser from "cookie-parser";
import { app,server } from "./socket/socket.js";
import path from "path";

dotenv.config();


const PORT = process.env.PORT || 5000;

const __dirname=path.resolve();

app.use(express.json());
app.use(cookieParser());


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)
app.use('/api/users',userRoutes)

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"));
})

app.get('/',(req,res)=>{
    res.send("Server is ready");
})

server.listen(PORT, () => {
    connectDB();
    console.log(`Server is running on port ${PORT}`);
});
