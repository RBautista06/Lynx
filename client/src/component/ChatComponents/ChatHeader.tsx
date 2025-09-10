import { CircleEllipsis, LucideVideo, PhoneCall } from "lucide-react";

interface chatHeaderProps {
  fullName: string;
  username: string;
  profilePic: string;
}

const ChatHeader = ({ fullName, username, profilePic }: chatHeaderProps) => {
  return (
    <div className="py-3 px-4 flex justify-between items-center bg-base-300 shadow-2xl">
      {/* Reciever Details */}
      <div className="flex gap-4 items-center">
        <div className="size-12 rounded-full overflow-hidden">
          <img src={profilePic} className="h-full w-full object-cover" />
        </div>
        <div className="flex flex-col ">
          <span className="font-semibold">{fullName}</span>
          <span className="italic opacity-70">{username}</span>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <button className="text-primary">
          <PhoneCall size={18} />
        </button>
        <button className="text-primary">
          <LucideVideo size={25} />
        </button>
        <button className="text-primary">
          <CircleEllipsis size={20} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;
