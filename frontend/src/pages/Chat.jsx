import MyChats from "../components/MyChats";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import { ChatState } from "../Context/ChatProvider";


const Chat = () => {
  const {user} = ChatState();
  return (
    <div className="flex flex-col w-full h-screen ">
      {user && <SideDrawer />}
      <div className="flex h-full  px-2.5 py-1.5">
         {user && <MyChats />}
        {/* {user && <ChatBox />}  */}
      </div>
    </div>
  );
}

export default Chat