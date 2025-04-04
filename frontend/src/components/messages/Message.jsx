import React from 'react'
import useConversation from '../../zustand/useConversation'
import { useAuthContext } from '../../context/AuthContext'
import { extractTime } from '../../utils/extractTime'
const Message = ({message}) => {
	const{authUser}=useAuthContext();
	const{selectedConversation}=useConversation();

  const formatedTime=extractTime(message.createdAt);
	const fromMe=message.senderId===authUser._id;
  const chatClassName=fromMe?"chat-end":"chat chat-start";
  const profilePic=fromMe?authUser.profilePic:selectedConversation.profilePic;
  const bubbleBgColor=fromMe?"bg-blue-500":"bg-gray-500";
  const shakeClass=message.shouldShake?"shake":""

  return (
    <div className={`chat ${chatClassName}`}>
        <div className="chat-image avatar">
            <div className="w-10 rounded-full">
                <img src={profilePic} alt="Tailwind CSS chat bubble" />
            </div>
        </div>
        <div className={`chat-bubble text-white bg-blue-500 ${bubbleBgColor} pb-2 ${shakeClass}`}>{message.message}</div>
		<div className='chat-footer opacity-50 text-xs flex gap-1 items-center'>{formatedTime}</div>
    </div>
  )
}

export default Message