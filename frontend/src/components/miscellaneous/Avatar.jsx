import React from "react";

const Avatar = ({ src, name, size = "md" }) => {
  const sizeClasses = {
    sm: "w-6 h-6 text-xs",
    md: "w-6.5 h-6.5 text-sm",
    lg: "w-12 h-12 text-base",
  };

  const initials = name?.[0]?.toUpperCase() || "?";

  return (
    <div
      className={`relative rounded-full overflow-hidden bg-amber-300 text-white flex items-center justify-center ${sizeClasses[size]}`}
    >
      {src ? (
        <img src={src} alt={name} className="object-cover w-full h-full" />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};

export default Avatar;
