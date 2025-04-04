import { Server } from "socket.io";
import http from "http";
import express from "express";

const app=express();

const server=http.createServer(app);

const io=new Server(server,
    {
        cors:{
            origin:["http://localhost:3000"],
            methods:["GET","POST"]
        }
    }
);

//this works for getting the socket id of the receiver
export const getReceiverSocketID=(receiverId)=>{
    return userSocketMap[receiverId];
}

const userSocketMap={};  //{userId:socketId}

io.on("connection",(socket)=>{
    // console.log("A user connected",socket.id);

    const userId=socket.handshake.query.userId; 
    // console.log("User ID from connection:", userId);
    
    if(userId!=="undefined"){
        userSocketMap[userId]=socket.id;
        // console.log("Current online users:", Object.keys(userSocketMap));
    }

    //send online users to all users by broadcasting them with their keys
    io.emit("getOnlineUsers",Object.keys(userSocketMap));

    socket.on("disconnect",()=>{
        // console.log("A user disconnected",socket.id);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers",Object.keys(userSocketMap));
    });
});

export {app,server,io}


