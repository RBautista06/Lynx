import ChatHeader from "./ChatHeader";

const ChatContainer = () => {
  return (
    <div
      className=" h-auto w-7xl flex justify-center l overflow-y-scroll"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}>
      <div className=" w-3xl px-5 py-7">
        {/* ChatContainer Header */}
        <ChatHeader
          username="@railleyyy"
          profilePic="/img/avatar.png"
          fullName="Railley Bautista"
        />
      </div>
    </div>
  );
};

export default ChatContainer;
