import React, { useState } from "react";
import { BiShow, BiHide } from "react-icons/bi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const BACKEND_URI =
    import.meta.env.VITE_REMOTE_BKND_URI || import.meta.env.VITE_LOCAL_BKND_URI;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pic, setPic] = useState("");
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleShowPassword = () => {
    setShow(!show);
  };

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      alert("Please select an image");
      setLoading(false);
      return;
    }
    if(pics.type === "image/jpeg" || pics.type === "image/png" ) {
      const formData = new FormData();
      formData.append("file", pics);
      formData.append("upload_preset", "chatapp");
      formData.append("cloud_name", "djt8dpogs");
      axios.post("https://api.cloudinary.com/v1_1/djt8dpogs/image/upload", formData)
      .then((res) => {
        setPic(res.data.url.toString());
        console.log(res.data.url.toString());
        setLoading(false);
       
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      })
    }

    else{
      alert("Please select a valid image type (jpeg or png)");
      setLoading(false);
      return;
    }
  }

  const handleSignup = async(e) => {
    e.preventDefault(); 
    setLoading(true);
      if(!name || !email || !password || !confirmPassword) {
        alert("Please fill all the fields");
        setLoading(false);
        return;
      }
      if(password !== confirmPassword){
        alert("Passwords do not match");
        setLoading(false);
        return;
      }
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          }
        }
        const {data}  = await axios.post(`${BACKEND_URI}/api/users`, {name, email, password, pic}, config); 
          alert("Registration Successful");
          localStorage.setItem("userInfo",  JSON.stringify(data));
          setLoading(false);
          navigate("/chats");
      } catch (error) {
        alert("Error occurred during registration");
        setLoading(false);
      }
  }

  return (
    <form onSubmit={(e) => e.preventDefault()}>
      {/* Name */}
      <div className="flex flex-col mt-4 text-sm">
        <label htmlFor="name" className="ml-2">
          Name
        </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="rounded-3xl border border-gray-300 px-3 py-1 mt-0.5 outline-none"
        />
      </div>

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

      {/* Confirm Password */}
      <div className="relative flex flex-col mt-3 mb-4 text-sm">
        <label htmlFor="confirmPassword" className="ml-2">
          Confirm Password
        </label>
        <input
          type={show ? "text" : "password"}
          name="confirmPassword"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="rounded-3xl border border-gray-300 px-3 py-1 mt-0.5 outline-none pr-10"
        />
        <button
          type="button"
          onClick={handleShowPassword}
          className="absolute right-3 top-8 text-gray-500 "
          tabIndex={-1}
          aria-label={show ? "Hide password" : "Show password"}
        >
          {show ? <BiHide /> : <BiShow />}
        </button>
      </div>

      <div className="flex flex-col mt-3 text-sm">
        <label htmlFor="picture" className="ml-2">
          Upload Profile Picture
        </label>
        <input
          type="file"
          name="picture"
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
          className="rounded-3xl border border-gray-300 px-3 py-1 mt-0.5 outline-none"
        />
      </div>
      {!loading ? (
        <button
          type="button"
          className="w-full text-sm mt-4 rounded-3xl px-3 py-1 bg-gray-700 text-gray-100"
          onClick={handleSignup}
        >
          Sign up
        </button>
      ) : (
        <button
          type="button"
          disabled
          className="w-full text-sm mt-4 rounded-3xl px-3 py-1 bg-gray-500 text-gray-100 opacity-60 cursor-not-allowed"
        >
          <span className="flex justify-center items-center gap-2">
            <svg
              className="animate-spin h-4 w-4 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Uploading...
          </span>
        </button>
      )}
    </form>
  );
};

export default Signup;
