import ChatContainer from "../component/ChatComponents/ChatContainer";
import ActiveUsers from "../component/ActiveUsers";
import Sidebar from "../component/Sidebar";

const MessagesPage = () => {
  return (
    <div className="flex items-center justify-center  h-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <ChatContainer />
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default MessagesPage;
