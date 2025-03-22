import Conversation from "../models/conversation.model.js";
import Message from "../models/message.model.js";
import { getReceiverSocketID } from "../socket/socket.js";
import { io } from "../socket/socket.js";

export const sendMessage = async (req, res) => {
  try {
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    });

    if (!conversation) {
      conversation = await Conversation.create({
        participants: [senderId, receiverId],
      });
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message,
    });

    if (newMessage) {
      conversation.messages.push(newMessage._id);
    }

    //this was taking time firstly conversation was saving and then new message was saving
    // await conversation.save();
    // await newMessage.save();

    //this is better way to save both conversation and new message in parallel
    await Promise.all([conversation.save(), newMessage.save()]);

    const receiverSocketId=getReceiverSocketID(receiverId);

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage",newMessage);
      // console.log("New message sent to receiver",receiverSocketId);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMessages = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, userToChatId] },
    }).populate("messages");    //NOT REFERENCE BUT ACTUAL MESSAGES

    if (!conversation) {
      return res.status(404).json([]);
    }

    const messages=conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal server error" });
  }
};

