import React, { useEffect, useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import axios from "axios";
import { FiPlus } from "react-icons/fi";
import { getSender } from "../config/ChatLogics";

const MyChats = () => {
  const [loggedUser, setLoggedUser] = useState();
  const { selectedChat, setSelectedChat, user, chats, setChats } = ChatState();

  const fetchChats = async () => {
    if (!user) return;
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3000/api/chat",
        config
      );
      setChats(data);
    } catch (error) {
      console.error("Failed to load chats", error);
    }
  };

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    setLoggedUser(storedUser);
    fetchChats();
  }, []);

  return (
    <div className="flex flex-col rounded-md bg-white w-80 p-3 h-full">
      {/* Header */}
      <div className="flex justify-between">
        <h1 className="font-medium text-gray-600 text-xl">My Chats</h1>
        <button className="hover:bg-gray-300 cursor-pointer flex gap-1 items-center font-normal rounded-md bg-gray-200 text-xs py-1 px-2">
          New Group Chat
          <FiPlus className="text-xl" />
        </button>
      </div>

      {/* Scrollable Chats List */}
      <div className="mt-auto flex flex-col scrollbar-hide overflow-y-scroll h-127">
        {loggedUser &&
          chats?.map((chat) => (
            <div
              key={chat._id}
              onClick={() => setSelectedChat(chat)}
              className={`py-3 px-3 rounded-md mb-2 cursor-pointer ${
                selectedChat?._id === chat._id
                  ? "bg-emerald-400 text-white"
                  : "bg-gray-100 hover:bg-gray-200"
              }`}
            >
              <h1 className="text-xs font-light">
                {!chat.isGroupChat
                  ? getSender(chat.users, loggedUser)
                  : chat.chatName}
              </h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default MyChats;
