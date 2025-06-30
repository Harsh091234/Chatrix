import React from "react";
import { RxCross2 } from "react-icons/rx";

const ProfileModal = ({ user, children, isOpen, onClose }) => {
  if (!isOpen) return null;

  

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center "
      // Close on backdrop click
    >
      <div className="bg-white rounded-lg p-6 w-[90%] max-w-sm shadow-lg relative border-1 border-gray-300">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-xl cursor-pointer"
        >
       <RxCross2 />
        </button>

        {/* User Info */}
        <h2 className="text-3xl font-semibold text-center">{user.name}</h2>
        <div className="flex flex-col items-center gap-4 mt-3">
        <img
  src={user.pic || "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"}
  alt={user.name || "User Avatar"}
  onError={(e) => {
    e.target.onerror = null; // Prevent infinite loop
    e.target.src = "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg";
  }}
  className="w-20 h-20 rounded-full object-cover border"
/>

          <p className="text-md text-gray-600">{user.email}</p>
        </div>

        {/* Custom content from children (optional) */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default ProfileModal;
