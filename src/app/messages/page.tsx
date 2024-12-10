'use client'

import React, { useState } from 'react'
import Sidebar from '@/components/Side-bar'
import Rsidebar from '@/components/Rside-bar'
import { IoSend } from "react-icons/io5";
import Image from 'next/image';

// Mock data for conversations
const mockConversations = [
  {
    id: 1,
    name: "Sarah Chen",
    image: "/images/pp4.jpg",
    lastMessage: "That's a great perspective!",
    lastActive: "2m ago",
    online: true,
    messages: [
      { id: 1, sender: "Sarah Chen", content: "Hi! I really enjoyed reading about your views on sustainable technology.", time: "10:30 AM", isSender: false },
      { id: 2, sender: "You", content: "Thank you! Yes, I believe tech should be developed with environmental impact in mind.", time: "10:32 AM", isSender: true },
      { id: 3, sender: "Sarah Chen", content: "That's a great perspective!", time: "10:35 AM", isSender: false },
    ]
  },
  {
    id: 2,
    name: "Michael Chang",
    image: "/images/pp2.jpg",
    lastMessage: "Would love to discuss this further",
    lastActive: "1h ago",
    online: false,
    messages: [
      { id: 1, sender: "Michael Chang", content: "Your work in AI ethics is fascinating.", time: "9:15 AM", isSender: false },
      { id: 2, sender: "You", content: "Thanks! It's a complex but important field.", time: "9:20 AM", isSender: true },
      { id: 3, sender: "Michael Chang", content: "Would love to discuss this further", time: "9:25 AM", isSender: false },
    ]
  },
  {
    id: 3,
    name: "Emma Rodriguez",
    image: "/images/pp3.jpg",
    lastMessage: "Looking forward to our next chat!",
    lastActive: "3h ago",
    online: true,
    messages: [
      { id: 1, sender: "Emma Rodriguez", content: "Hey! Just saw we matched on our photography interests.", time: "Yesterday", isSender: false },
      { id: 2, sender: "You", content: "Yes! What kind of photography do you focus on?", time: "Yesterday", isSender: true },
      { id: 3, sender: "Emma Rodriguez", content: "Looking forward to our next chat!", time: "Yesterday", isSender: false },
    ]
  }
];

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(mockConversations[0]);
  const [newMessage, setNewMessage] = useState("");
  const [conversations, setConversations] = useState(mockConversations);

  const sendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const updatedConversations = conversations.map(conv => {
      if (conv.id === selectedConversation.id) {
        return {
          ...conv,
          messages: [...conv.messages, {
            id: conv.messages.length + 1,
            sender: "You",
            content: newMessage,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            isSender: true
          }],
          lastMessage: newMessage
        };
      }
      return conv;
    });

    setConversations(updatedConversations);
    setSelectedConversation(updatedConversations.find(conv => conv.id === selectedConversation.id)!);
    setNewMessage("");
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <main className="flex-1 p-4 lg:ml-64 lg:mr-64">
        <div className="bg-white rounded-2xl shadow-sm h-[calc(100vh-2rem)] flex overflow-hidden">
          {/* Conversations List */}
          <div className="w-1/3 border-r border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-xl font-semibold">Messages</h2>
            </div>
            <div className="overflow-y-auto h-[calc(100%-4rem)]">
              {conversations.map((conversation) => (
                <div
                  key={conversation.id}
                  onClick={() => setSelectedConversation(conversation)}
                  className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${
                    selectedConversation.id === conversation.id ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <div className="relative">
                      <div className="relative w-12 h-12 rounded-full overflow-hidden">
                        <Image
                          src={conversation.image}
                          alt={conversation.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      {conversation.online && (
                        <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 rounded-full border-2 border-white"></div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-sm font-medium text-gray-900 truncate">
                          {conversation.name}
                        </h3>
                        <span className="text-xs text-gray-500">{conversation.lastActive}</span>
                      </div>
                      <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chat Area */}
          <div className="flex-1 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center space-x-4">
              <div className="relative">
                <div className="relative w-10 h-10 rounded-full overflow-hidden">
                  <Image
                    src={selectedConversation.image}
                    alt={selectedConversation.name}
                    fill
                    className="object-cover"
                  />
                </div>
                {selectedConversation.online && (
                  <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-white"></div>
                )}
              </div>
              <div>
                <h3 className="font-medium">{selectedConversation.name}</h3>
                <p className="text-xs text-gray-500">
                  {selectedConversation.online ? 'Online' : selectedConversation.lastActive}
                </p>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {selectedConversation.messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isSender ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`flex items-end space-x-2 max-w-[70%] ${message.isSender ? 'flex-row-reverse space-x-reverse' : ''}`}>
                    {!message.isSender && (
                      <div className="relative w-8 h-8 rounded-full overflow-hidden flex-shrink-0">
                        <Image
                          src={selectedConversation.image}
                          alt={message.sender}
                          fill
                          className="object-cover"
                        />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl px-4 py-2 ${
                        message.isSender
                          ? 'bg-[#6666FF] text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className={`text-xs mt-1 ${message.isSender ? 'text-white/70' : 'text-gray-500'}`}>
                        {message.time}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1 border border-gray-200 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#6666FF] transition-all"
                />
                <button
                  type="submit"
                  className="bg-[#6666FF] text-white p-2 rounded-full hover:bg-[#5555ee] transition-colors"
                >
                  <IoSend className="w-5 h-5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
      <Rsidebar />
    </div>
  )
}
