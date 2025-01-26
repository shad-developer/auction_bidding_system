import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Heading } from "../components/common/Design";
import { FaCheck } from "react-icons/fa6";
import {
  getMessages,
  getUserforSidebar,
  sendMessage,
  setSelectedUser,
} from "../redux/features/messageSlice";
import Loader from "./../components/common/Loader";
import io from "socket.io-client";

const Inbox = () => {
  const dispatch = useDispatch();
  const chatContainerRef = useRef();
  const { messages, users, selectedUser, isLoading, isError } = useSelector(
    (state) => state.message
  );
  const { user } = useSelector((state) => state.auth);
  const [newMessage, setNewMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user?._id) {
      const socket = io(import.meta.env.VITE_BACKEND_URL_MAIN, {
        query: { userId: user._id },
      });

      setSocket(socket);

      socket.on("getOnlineUsers", (user) => {
        setOnlineUsers(user);
      });

      return () => socket.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user?._id]);

  // Get users for sidebar
  useEffect(() => {
    dispatch(getUserforSidebar());
  }, [dispatch]);

  useEffect(() => {
    if (selectedUser) {
      dispatch(getMessages(selectedUser._id));
      socket.emit("joinRoom", selectedUser._id);
    }
  }, [dispatch, selectedUser]);

  // Handle incoming messages
  useEffect(() => {
    if (socket) {
      socket.on("receiveMessage", (message) => {
        if (message.senderId === selectedUser?._id) {
          dispatch(getMessages(selectedUser._id));
        }
      });

      return () => {
        socket.off("receiveMessage");
      };
    }
  }, [dispatch, selectedUser]);

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedUser) {
      socket.emit("sendMessage", newMessage);
      dispatch(
        sendMessage({ receiverId: selectedUser._id, message: newMessage })
      );
      setNewMessage("");
    }
  };

  // Scroll to the last message when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleUserClick = (user) => {
    setNewMessage("");
    dispatch(setSelectedUser(user));
  };

  return (
    <section className="inbox mt-28">
      <Container>
        <Heading title="Chat With Seller/Buyer" />
        <div className="flex mt-5">
          {/* Sidebar */}
          <div className="w-1/4 bg-primary p-6 shadow-s1 h-[calc(96vh-4rem)] overflow-y-auto">
            <div className="space-y-4">
              {users?.map((user) => (
                <div
                  key={user?._id}
                  onClick={() => handleUserClick(user)}
                  className={`p-4 cursor-pointer border-2 transition duration-300 ease-in-out transform hover:scale-105 ${
                    selectedUser?._id === user?._id && "bg-green"
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="font-semibold text-white">{user?.name}</div>
                    {onlineUsers.includes(user._id) && (
                      <>
                        <div class="text-sm text-white">(online now)</div>
                        {/* <div className="flex items-center">
                          <span className="custom-online-status"></span>
                        </div> */}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Window */}
          <div className="w-3/4 ml-8 bg-white p-6 rounded-r-md shadow-s2">
            {selectedUser ? (
              <>
                <h3 className="text-2xl font-semibold text-text">
                  {selectedUser?.name}
                </h3>
                <hr className="mt-4" />

                {/* Chat Messages */}
                <div
                  className="flex-1 space-y-4 mb-10 overflow-y-auto h-96"
                  ref={chatContainerRef}
                >
                  {isLoading ? (
                    <Loader />
                  ) : isError ? (
                    <div>Error fetching messages</div>
                  ) : messages?.length === 0 ? (
                    <div className="flex justify-center items-center h-full text-center">
                      No Message Found 👻
                    </div>
                  ) : (
                    messages?.map((msg, index) => (
                      <div
                        key={index}
                        className={`flex ${
                          msg.senderId !== selectedUser?._id
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <div className="flex flex-col">
                          <span
                            className={`text-xs mr-5 mt-5 font-semibold text-gray-500 mb-2 ${
                              msg.senderId === selectedUser?._id
                                ? "text-left"
                                : "text-right"
                            }`}
                          >
                            {msg.senderId !== selectedUser?._id
                              ? "You"
                              : selectedUser?.name}
                          </span>
                          <div
                            className={`max-w-xs px-4 py-3 mr-5 rounded-lg ${
                              msg.senderId === selectedUser?._id
                                ? "bg-green text-white"
                                : "bg-gray-100 text-text"
                            }`}
                          >
                            {msg.message}
                            <div className="text-xs text-gray-500 mt-2">
                              {new Date(msg.createdAt).toLocaleString()}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Message Input */}
                <div className="flex items-center space-x-4">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="w-full p-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary transition duration-300 ease-in-out"
                    placeholder="Type a message..."
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-green text-white rounded-lg hover:bg-green-600 transition duration-300 ease-in-out transform hover:scale-105"
                  >
                    Send
                  </button>
                </div>
              </>
            ) : (
              <div className="flex flex-col justify-center items-center h-full text-lg text-gray-500">
                <p>Welcome 👋 {user?.name} ❄</p>
                <p>Select a chat to start Messaging</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Inbox;
