import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAuth } from "../store/storeSlice/authSlice";

const ActiveUsers = () => {
  const { user, isLoading } = useSelector(userAuth);
  return (
    <aside className="border-l border-gray-700 h-full  w-20 lg:w-85 flex flex-col py-10 px-5 gap-5">
      {/* own profile */}
      <div className="border-y-1 border-gray-700 py-2 ">
        <Link
          to="/"
          className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center ">
          <div className="size-10 border-primary border-2 rounded-full overflow-hidden object-cover">
            <img
              src={user?.profilePic}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">{user?.username}</span>
            <span className="text-sm opacity-50">{user?.fullName}</span>
          </div>
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-semibold opacity-50">Currently Online</span>
        <div className="flex flex-col gap-1">
          <Link
            to="/"
            className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center">
            <div className="size-9 border-primary rounded-full overflow-hidden object-cover">
              <img src="/img/avatar.png" className="h-full w-full" />
            </div>
            {/* fullname of active user here */}
            <span className="font-semibold">Full Name</span>
          </Link>
          <Link
            to="/"
            className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center">
            <div className="size-9 border-primary rounded-full overflow-hidden object-cover">
              <img src="/img/avatar.png" className="h-full w-full" />
            </div>
            {/* fullname of active user here */}
            <span className="font-semibold">Full Name</span>
          </Link>
          <Link
            to="/"
            className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center">
            <div className="size-9 border-primary rounded-full overflow-hidden object-cover">
              <img src="/img/avatar.png" className="h-full w-full" />
            </div>
            {/* fullname of active user here */}
            <span className="font-semibold">Full Name</span>
          </Link>
          <Link
            to="/"
            className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center">
            <div className="size-9 border-primary rounded-full overflow-hidden object-cover">
              <img src="/img/avatar.png" className="h-full w-full" />
            </div>
            {/* fullname of active user here */}
            <span className="font-semibold">Full Name</span>
          </Link>
          <Link
            to="/"
            className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center">
            <div className="size-9 border-primary rounded-full overflow-hidden object-cover">
              <img src="/img/avatar.png" className="h-full w-full" />
            </div>
            {/* fullname of active user here */}
            <span className="font-semibold">Full Name</span>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default ActiveUsers;
