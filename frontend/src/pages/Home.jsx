import React, { useState, useEffect } from "react";
import Login from "../components/authentication/Login";
import Signup from "../components/authentication/Signup";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [activeTab, setActiveTab] = useState("login");
  const navigate = useNavigate();

  useEffect(() => {
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    if (userInfo) navigate("/chats");
  }, [navigate]);
    
  return (
    <div
      className="w-full sm:max-w-md mx-auto px-4 py-6 flex flex-col items-center justify-center 
       max-sm:px-0 max-sm:py-4 "
    >
      <div className="bg-white shadow rounded-lg p-4 mb-6 w-full max-sm:rounded-none max-sm:h-[3.3rem]">
        <h1 className="text-3xl font-semibold font-sans text-center max-sm:scale-[90%]">
          Chatrix
        </h1>
      </div>

      <div className="bg-white shadow rounded-lg p-4 w-full max-sm:rounded-none">
        <div className="flex mb-4">
          <button
            className={`w-1/2 py-2 text-center font-semibold text-[15px] transition-all ${
              activeTab === "login"
                ? "border-b-2 text-gray-950"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("login")}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 text-center font-semibold text-[15px] transition-all duration-100 ${
              activeTab === "signup"
                ? "border-b-2 text-gray-950"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("signup")}
          >
            Signup
          </button>
        </div>

        <div>{activeTab === "login" ? <Login /> : <Signup />}</div>
      </div>
    </div>
  );
};

export default Home;
