import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { userAuth } from "../store/storeSlice/authSlice";
import {
  getOnlineUsers,
  messageRequests,
  setOnlineUserIds,
} from "../store/storeSlice/messageSlice";
import { useEffect, useState } from "react";
import type { AppDispatch } from "../store/store";
import { connectSocket } from "../lib/socket";

const ActiveUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(userAuth);
  const { onlineUserIds, allUsers } = useSelector(messageRequests);

  const [showOnlineOnly, setShowOnlineOnly] = useState(false);

  useEffect(() => {
    if (!user?._id) return;

    const socket = connectSocket(user._id);
    dispatch(getOnlineUsers());

    socket.on("getOnlineUsers", (userIds: string[]) => {
      dispatch(setOnlineUserIds(userIds));
    });
    return () => {
      socket.off("getOnlineUsers");
    };
  }, [user?._id]);

  const filteredUsers = showOnlineOnly
    ? allUsers?.filter((user) => onlineUserIds?.includes(user._id))
    : allUsers;

  return (
    <aside className="border-l border-gray-700 h-full  w-20 lg:w-85 flex flex-col py-10 px-5 gap-5">
      {/* own profile */}
      <div className="border-y-1 border-gray-700 py-2 ">
        <Link
          to="/profile"
          className="flex gap-5 cursor-pointer rounded-lg p-2 hover:bg-base-200 items-center ">
          <div className="size-10 border-primary border-2 rounded-full overflow-hidden object-cover">
            <img
              src={user?.profilePic || "./img/avatar.png"}
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
        <div className="flex justify-between">
          <span className="font-semibold opacity-50">
            {showOnlineOnly ? "Currently Online" : "Friends"}
          </span>
          <input
            type="checkbox"
            checked={showOnlineOnly}
            onChange={(e) => setShowOnlineOnly(e.target.checked)}
            className="toggle toggle-success"
          />
        </div>

        <div className="flex flex-col gap-4">
          {filteredUsers?.map((user) => (
            <Link
              key={user._id}
              to="/"
              className="relative flex gap-4 items-center p-2 rounded hover:bg-base-200">
              <div className="relative">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                  <img
                    src={user.profilePic || "/img/avatar.png"}
                    alt={user.fullName}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Green Dot */}
                {onlineUserIds?.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                )}
              </div>

              <div className="flex flex-col">
                <span className="font-semibold">{user.fullName}</span>
                <span className="text-xs opacity-60">@{user.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </aside>
  );
};

export default ActiveUsers;
