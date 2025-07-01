import React from 'react'
import  { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";




const Login = () => {
  const BACKEND_URI =
    import.meta.env.VITE_REMOTE_BKND_URI ||
    import.meta.env.VITE_LOCAL_BKND_URI;
  
  const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
      const [show, setShow] = useState(false);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
      const handleShowPassword = () => {
        setShow(!show);
      };

      
  const handleLogin = async(e) => {
    e.preventDefault();
    setLoading(true);
      if(!email || !password ) {
        alert("Please fill all the fields");
        setLoading(false);
        return;
      }
    
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }
        const {data}  = await axios.post(`${BACKEND_URI}/api/users/login`, {email, password}, config); 
        
          alert("Login Successful");
          localStorage.setItem("userInfo",  JSON.stringify(data));
          setLoading(false);

          navigate("/chats");
      } catch (error) {
        alert("Error occurred during login");
        setLoading(false);
      }
    
  };

  return (
    <div className="px-2  h-89">
      <form>
        {/* Email */}
        <div className="flex flex-col mt-3 text-sm">
          <label htmlFor="email" className="ml-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="rounded-3xl border border-gray-300 px-3 py-1 mt-0.5 outline-none"
          />
        </div>

        {/* Password + Show/Hide Icon */}
        <div className="relative flex flex-col mt-3 text-sm">
          <label htmlFor="password" className="ml-2">
            Password
          </label>
          <input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="rounded-3xl border border-gray-300 px-3 py-1 mt-0.5 outline-none pr-10"
          />
          <button
            type="button"
            onClick={handleShowPassword}
            className="absolute right-3 top-8 text-gray-500"
            tabIndex={-1}
            aria-label={show ? "Hide password" : "Show password"}
          >
            {show ? <BiHide /> : <BiShow />}
          </button>
        </div>

        <div>
          <button
            className="w-full  text-sm mt-4 rounded-3xl px-3 py-1 bg-gray-700 text-gray-100"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>

        <div>
          <button
            type="button"
            className="w-full  text-sm mt-2 rounded-3xl px-3 py-1 bg-[#0F172A] text-gray-100"
            onClick={() => {
              setEmail("guest@example.com");
              setPassword("guest123");
            }}
          >
            Get guest user credentials
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login