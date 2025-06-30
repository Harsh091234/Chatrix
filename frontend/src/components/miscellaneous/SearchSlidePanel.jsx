import React from "react";
import axios from "axios";
import ChatLoading from "../ChatLoading";
import UserListItem from "../User Avatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
const SearchSlidePanel = ({ isOpen, onClose, handleSearch, loading, setSearch, searchResult, user, setSelectedChat }) => {
  const { chats, setChats } = ChatState();
  
  const accessChat = async(userId) => {
    try {
      const config = {
        headers: {
          "Content-Type" : "application/json",
          Authorization: `Bearer ${user.token}`
        }
      }
      const {data} = await axios.post("http://localhost:3000/api/chat", {userId}, config);
      if (!chats.find((c) => c._id === data._id)) {
        setChats([data, ...chats]);
      }
      
      setSelectedChat(data);
      onClose();  

    } catch (error) {
      alert("Error fetching chats");
      return
    }
      
  }

  return (
    <>
      {/* Right Overlay */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-black z-40 transition-opacity duration-300 ${
          isOpen ? "opacity-80" : "opacity-0 pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* Left Slide-in Panel */}
      <div
        className={`fixed top-0 left-0 h-full w-[35%] bg-gray-100 z-50 py-4 px-6 shadow-lg transition-transform duration-300 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <h1 className="mt-5 font-semibold text-lg">Search Users</h1>

        <div className="mt-4 flex gap-2">
          <input
            type="text" 
            
            placeholder="Enter name or email"
            className="text-sm py-1 px-3 outline-none border-2 rounded-md border-gray-300 w-full" onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-gray-300 hover:bg-gray-400 text-sm px-3 py-1 rounded-md"
          >
            Go
          </button>
        </div>

        {/* <h2 className="text-gray-600 text-sm mt-5">Results</h2> */}
        {/* Render results below if needed */}
        {loading ? (
          <ChatLoading />
        ) : (
          <ul>
            {searchResult.map((searchUser) =>( 
                <UserListItem key={searchUser._id} user={searchUser} handleFunction={() => accessChat(searchUser._id)}  />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default SearchSlidePanel;
