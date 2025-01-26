const Message = require("../models/messageModel")
const User = require("../models/userModel")
const Conversation = require("../models/conversationModel")
const {getReceiverSocketId, io} = require("../socket/socket")

// send messages 
module.exports.sendMessage = async (req, res) => {
  try {
    const { message,  id: receiverId  } = req.body;

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
    
    await Promise.all([conversation.save(), newMessage.save()]);
    
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) { 
      io.to(receiverSocketId).emit("receiveMessage", newMessage);
    }

    res.status(201).json(newMessage);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal Server Error" });
  }
};


// get all messages
module.exports.getMessages = async (req, res) => {
  try {
    const { id: receiverId } = req.query;

    const senderId = req.user._id;
    
    const conversation = await Conversation.findOne({
      participants: { $all: [senderId, receiverId] },
    }).populate("messages");

    if (!conversation) {
      return res.status(200).json([]);
    }
    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal Server Error" });
  }
};



// get users/conversations for sidebar

module.exports.getUserforSidebar = async (req, res) => {
  try {
    const senderId = req.user._id; // login user id
    const filteredUser = await User.find({
      _id: { $ne: senderId },
    }).select("-password -email");
    res.status(200).json(filteredUser);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
