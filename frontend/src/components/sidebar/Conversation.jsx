import React, { useEffect } from "react";
import useConversation from "../../zustand/useConversation";
import { useSocketContext } from "../../context/SocketContext";

const Conversation = ({ conversation, emoji, lastIdx }) => {
	const { selectedConversation, setSelectedConversation } = useConversation();
	const { onlineUsers } = useSocketContext();
	
	// Debug log to check what's happening
	useEffect(() => {
		console.log("Online Users:", onlineUsers);
		console.log("Current conversation user ID:", conversation._id);
	}, [onlineUsers, conversation]);
	
	// The onlineUsers array contains the _id of online users
	const isOnline = onlineUsers.includes(conversation._id);
	
	const isSelected = selectedConversation?._id === conversation._id;

	return (
		<>
			<div
				className={`flex gap-2 items-center hover:bg-sky-500 rounded p-2 py-1 cursor-pointer 
				${isSelected ? "bg-sky-500 transition-all duration-300" : ""}
				`}
				onClick={() => setSelectedConversation(conversation)}
			>
				<div className="relative">
					<div className="w-12 h-12 rounded-full overflow-hidden">
						<img src={conversation.profilePic} alt="user avatar" className="w-full h-full object-cover" />
					</div>
					{isOnline && (
						<div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 rounded-full border-2 border-white"></div>
					)}
				</div>

				<div className="flex flex-col flex-1">
					<div className="flex gap-3 justify-between">
						<p className="font-bold text-gray-200">{conversation.fullName}</p>
						<span className="text-xl">{emoji}</span>
					</div>
				</div>
			</div>

			{!lastIdx && <div className="divider my-0 py-0 h-1" />}
		</>
	);
};
export default Conversation;
