import { useEffect } from "react";
import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";
import notificationSound from "../assets/sounds/notification.mp3";

const useListenMessages=()=>{
    const {socket}=useSocketContext();
    const {messages,setMessages}=useConversation();

    useEffect(()=>{
        socket?.on("newMessage",(newMessage)=>{
            newMessage.shouldShake=true;
            // console.log("New message received",newMessage);
            const sound=new Audio(notificationSound);
            sound.play();
            setMessages([...messages,newMessage]);
        });
        return ()=>{
            //this line is important becasue it will remove the event listener when the component is unmounted and rendered only once rather then number of listeners
            socket?.off("newMessage");
        }
    },[socket,messages,setMessages]);
}

export default useListenMessages;
