const ChatLoading= () => {
  return (
    <div className="p-4 space-y-4 animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="flex items-center space-x-4">
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 rounded-full bg-gray-300" />

          {/* Text Lines */}
          <div className="flex-1 space-y-2">
            <div className="h-3 bg-gray-300 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ChatLoading;
