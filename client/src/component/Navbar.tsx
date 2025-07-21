import { MessageSquare, Settings, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="px-4 py-3">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="size-12 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden p-2">
            <img
              src="/lynx_gradient.svg"
              className="w-full h-full object-contain"
            />
          </div>

          <div className="flex flex-col ">
            <h1 className="text-xl font-bold font-['GeneralSans-bold']">
              Lynx
            </h1>
            <span className="text-sm text-gray-500 hidden sm:block font-['khand-Regular'] ">
              Unfiltered Moments
            </span>
          </div>
        </Link>

        {/* Right Section - User Actions */}
        <div className="flex items-center gap-3">
          {/* Settings */}
          <Link
            to="/settings"
            className="p-2 text-gray-600 hover:text-gray-100 hover:bg-gray-700 rounded-lg transition-colors">
            <Settings className="size-5" />
          </Link>
          {/* {authUser && ( */}
          <>
            <div className="flex items-center gap-3 pl-3 border-l border-gray-200">
              <Link
                to="/profile"
                className="size-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <User className="size-4 text-primary" />
              </Link>
              <button
                // onClick={logout}
                className="size-8 rounded-full bg-primary/10 flex items-center justify-center hover:bg-primary/20 transition-colors">
                <LogOut className="size-4 text-primary" />
              </button>
            </div>
          </>
          {/* )} */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
