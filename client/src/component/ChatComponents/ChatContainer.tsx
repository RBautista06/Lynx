import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";

const ChatContainer = () => {
  return (
    <div
      className=" h-auto w-7xl flex justify-center l overflow-y-scroll"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}>
      <div className=" w-3xl px-5 py-7 flex flex-col">
        <div className="flex flex-col rounded-lg h-full overflow-hidden">
          {/* ChatContainer Header */}
          <ChatHeader
            username="@railleyyy"
            profilePic="/img/avatar.png"
            fullName="Railley Bautista"
          />
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-base-200">
            <div className="chat chat-start">
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src="/img/avatar.png" alt="profile pic" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">date in this</time>
              </div>
              <div className="chat-bubble flex flex-col">
                <p>Chat from reciever</p>
              </div>
            </div>
            <div className="chat chat-end">
              <div className="chat-image avatar">
                <div className="size-10 rounded-full border">
                  <img src="/img/avatar.png" alt="profile pic" />
                </div>
              </div>
              <div className="chat-header mb-1">
                <time className="text-xs opacity-50 ml-1">date in this</time>
              </div>
              <div className="chat-bubble flex flex-col bg-accent text-accent-content">
                <p>Chat from Sender</p>
              </div>
            </div>
          </div>
          <MessageInput />
        </div>
      </div>
    </div>
  );
};

export default ChatContainer;
