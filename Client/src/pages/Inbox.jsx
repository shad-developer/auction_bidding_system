import React, { useEffect, useState } from 'react';
import { Container, Heading } from '../components/common/Design';

const Inbox = () => {

    const sellers = [
        { id: "672cfe1fc7095832f3bacfc4", name: 'John Doe' },
    ];

    const [selectedSeller, setSelectedSeller] = useState(sellers[0]);
    const [messages, setMessages] = useState([
        { id: 1, sender: 'John Doe', content: 'Hii' },
        { id: 2, sender: 'John Doe', content: 'How are you?' }
    ]);
    const [newMessage, setNewMessage] = useState('');

    const handleSendMessage = () => {
        if (newMessage.trim()) {
            setMessages(prevMessages => [
                ...prevMessages,
                { id: prevMessages.length + 1, sender: 'You', content: newMessage }
            ]);
            setNewMessage('');
        }
    };

    return (
        <section className="inbox mt-28">
            <Container>
                <Heading title="Chat With Sellers" />
                <div className="flex mt-5">
                    {/* Sidebar */}
                    <div className="w-1/4 bg-primary p-6 shadow-s1 h-[calc(96vh-4rem)] overflow-y-auto">
                        <div className="space-y-4">
                            {sellers.map((seller) => (
                                <div
                                    key={seller.id}
                                    onClick={() => setSelectedSeller(seller)}
                                    className={`p-4 cursor-pointer border-2 transition duration-300 ease-in-out transform hover:scale-105 ${selectedSeller.id === seller.id && 'bg-green'}`}
                                >
                                    <div className="text-white font-semibold">{seller.name}</div>
                                    <p className="text-xs text-white">online</p>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Chat Window */}
                    <div className="w-3/4 ml-8 bg-white p-6 rounded-r-md shadow-s2">
                        <h3 className="text-2xl font-semibold text-text">{selectedSeller.name}</h3>
                        <hr className="mt-4" />

                        {/* Chat Messages */}
                        <div className="space-y-4 mb-6 overflow-y-auto h-96 border-b pb-4">
                            {messages.map((msg, index) => (
                                <div key={index} className={`flex ${msg.sender === 'You' ? 'justify-end' : 'justify-start'}`}>
                                    <div className="flex flex-col">
                                        <span className={`text-xs mr-5 mt-5 font-semibold text-gray-500 mb-2 ${msg.sender === 'You' ? 'text-right' : 'text-left'}`}>{msg.sender}</span>
                                        <div className={`max-w-xs px-4 py-3 mr-5 rounded-r-lg ${msg.sender === 'You' ? 'bg-gradient-to-r from-green to-primary text-white' : 'bg-gray-100 text-text'}`}>
                                            {msg.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
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
                    </div>
                </div>
            </Container>
        </section>
    );
};

export default Inbox;
