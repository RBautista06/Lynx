import {
  Bell,
  Box,
  Compass,
  HomeIcon,
  Menu,
  MessageCircle,
  Search,
  SquarePlus,
} from "lucide-react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="h-full border-r flex flex-col w-20 lg:w-85 py-10 px-5 gap-10">
      <div className="flex items-center gap-3">
        <div className="size-10 flex items-center justify-center overflow-hidden p-1">
          <img src="/lynx_white.svg" className="w-full h-full object-contain" />
        </div>
        <h2 className="text-3xl font-['GeneralSans-bold'] text-center">LYNX</h2>
      </div>
      <div className="flex flex-col h-full justify-between">
        <div className="flex flex-col gap-3">
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <HomeIcon className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">Home</h1>
          </Link>
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <Search className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">Search</h1>
          </Link>
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <Compass className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">Explore</h1>
          </Link>
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <MessageCircle className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">Messages</h1>
          </Link>
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <Bell className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">Notification</h1>
          </Link>
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <SquarePlus className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">Create</h1>
          </Link>
          <Link to="/" className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200">
            <div className="size-6 border-primary border-2 rounded-full overflow-hidden"></div>
            <h1 className="font-semibold">Profile</h1>
          </Link>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            to="/"
            className="flex gap-5 cursor-pointer hover:bg-base-200  p-2 rounded-lg ">
            <Menu className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">More</h1>
          </Link>
          <Link
            to="/"
            className="flex gap-5 cursor-pointer  p-2 rounded-lg hover:bg-base-200">
            <Box className="w-6 h-6 text-primary" />
            <h1 className="font-semibold">About Lynx</h1>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
