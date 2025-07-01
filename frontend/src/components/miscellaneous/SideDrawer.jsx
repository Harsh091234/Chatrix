import React, { useState, useEffect } from "react";
import { IoMdSearch } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { TiArrowSortedDown } from "react-icons/ti";
import Avatar from "./Avatar";
import ProfileModal from "./ProfileModal";
import { useNavigate } from "react-router-dom";
import SearchSlidePanel from "./SearchSlidePanel";
import { BiEraser } from "react-icons/bi";
import axios from "axios";
import { ChatState } from "../../context/ChatProvider";


const SideDrawer = () => {
  const BACKEND_URI =
    import.meta.env.VITE_REMOTE_BKND_URI || import.meta.env.VITE_LOCAL_BKND_URI;

  const navigate = useNavigate();
  const [isHidden, setIsHidden] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchPanelOpen, setIsSearchPanelOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [user, setUser] = useState(null);

  const {setSelectedChat} = ChatState();

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("userInfo"));
    if (storedUser) {
      setUser(storedUser);
    } else {
      navigate("/"); // Redirect if user not found
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  const handleHidden = () => {
    setIsHidden(!isHidden);
  };

  const handleSearch = async () => {
    if (!search) {
      alert("Please enter something in search");
      return;
    }
    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `${BACKEND_URI}/api/users?search=${search}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      alert("Failed to load search results");
    }
  };

  if (!user) return null; // optional: show a spinner here

  return (
    <div className="px-2 w-full justify-between h-10 flex items-center bg-white ">
      <div className="flex h-fit  items-center w-fit">
        <button
          className="flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium  text-gray-600 rounded hover:bg-gray-100 cursor-pointer transition"
          onClick={() => setIsSearchPanelOpen(true)}
        >
          <IoMdSearch className="text-xl" />
          Search
        </button>
      </div>
      <h1 className="font-medium text-gray-500 text-2xl">Chatrix</h1>
      <div className="flex gap-5">
        <button className="cursor-pointer">
          <FaBell className="text-md text-gray-500" />
        </button>
        <button
          className="flex items-center relative gap-2 cursor-pointer hover:bg-gray-100 py-1 px-3"
          onClick={handleHidden}
        >
          <Avatar src={user.pic} name={user.name} />
          <TiArrowSortedDown className="text-sm" />
        </button>
        <ul
          className={`bg-white absolute top-[40.2px] w-[148px] right-1.5 rounded-lg border-2 border-gray-300 overflow-hidden transition-all duration-300 ease-in-out transform ${
            isHidden
              ? "opacity-0 scale-95 pointer-events-none"
              : "opacity-100 scale-100"
          }`}
        >
          <li
            className="text-center hover:bg-gray-100 text-xs py-2 cursor-pointer"
            onClick={() => {
              handleHidden();
              setIsModalOpen(true);
            }}
          >
            <a href="#">My Profile</a>
          </li>

          <li
            className="text-center hover:bg-gray-100 text-xs py-2 cursor-pointer"
            onClick={handleLogout}
          >
            <a href="#">Logout</a>
          </li>
        </ul>
      </div>
      <ProfileModal
        user={user}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <SearchSlidePanel
        handleSearch={handleSearch}
        isOpen={isSearchPanelOpen}
        onClose={() => setIsSearchPanelOpen(!isSearchPanelOpen)}
        loading={loading}
        setSearch={setSearch}
        searchResult={searchResult}
        user={user}
        setSelectedChat={setSelectedChat}
      />
    </div>
  );
};

export default SideDrawer;
