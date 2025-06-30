import React from "react";

const UserListItem = ({ user, handleFunction }) => {
  return (
    <div
      onClick={handleFunction}
      className="cursor-pointer bg-gray-200 hover:bg-emerald-400 hover:text-white p-2 mt-2 mb-1 rounded-md flex items-center transition-colors duration-200"
    >
      <img
        src={user.pic}
        alt={user.name}
        className="w-[30px] h-[30px] rounded-full mr-2 object-cover"
      />
      <span className="text-sm font-medium">{user.name}</span>
    </div>
  );
};

export default UserListItem;
