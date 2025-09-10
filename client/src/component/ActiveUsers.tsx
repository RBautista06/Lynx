import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { userAuth } from "../store/storeSlice/authSlice";
import {
  getOnlineUsers,
  messageRequests,
  setOnlineUserIds,
} from "../store/storeSlice/messageSlice";
import type { AppDispatch } from "../store/store";
import { connectSocket } from "../lib/socket";
import ActiveUsersSkeleton from "./skeletons/ActiveUserSkeleton";

const ActiveUsers = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(userAuth);
  const { onlineUserIds, allUsers, isOnlineUsersLoading } =
    useSelector(messageRequests);

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
    ? allUsers?.filter(
        (u) => u._id !== user?._id && onlineUserIds?.includes(u._id)
      )
    : allUsers?.filter((u) => u._id !== user?._id);

  return (
    <>
      {isOnlineUsersLoading ? (
        <ActiveUsersSkeleton />
      ) : (
        <aside className="border-l border-gray-700 h-screen w-20 lg:w-85 flex flex-col p-5 gap-5">
          {/* Own profile */}
          <div className=" py-2">
            <Link
              to="/profile"
              className="flex gap-5 cursor-pointer py-2 px-3 hover:bg-base-200 items-center bg-base-300 rounded-xl">
              <div className="size-10 border-primary border-2 rounded-full overflow-hidden">
                <img
                  src={user?.profilePic || "/img/avatar.png"}
                  className="h-full w-full object-cover"
                  alt={user?.fullName}
                />
              </div>
              <div className="flex flex-col">
                <span className="font-semibold">{user?.username}</span>
                <span className="text-sm opacity-50">{user?.fullName}</span>
              </div>
            </Link>
          </div>

          {/* Toggle + Online Users */}
          <div className="flex flex-col gap-2 flex-1 overflow-hidden">
            <div className="flex justify-between items-center">
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

            {/* Scrollable user list */}
            <div
              className="flex-1 overflow-y-auto  rounded p-1"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}>
              {isOnlineUsersLoading && <span>Loading...</span>}
              {!isOnlineUsersLoading && filteredUsers?.length === 0 && (
                <span className="text-sm opacity-50">
                  {showOnlineOnly ? "No one is online" : "No users found"}
                </span>
              )}
              <div className="flex flex-col gap-1">
                {filteredUsers?.map((u) => (
                  <Link
                    key={u._id}
                    to={`/messages`}
                    className="relative flex gap-4 items-center p-2 rounded hover:bg-base-200">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-600">
                        <img
                          src={u.profilePic || "/img/avatar.png"}
                          alt={u.fullName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {onlineUserIds?.includes(u._id) && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-white"></span>
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold">{u.fullName}</span>
                      <span className="text-xs opacity-60">@{u.username}</span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </aside>
      )}
    </>
  );
};

export default ActiveUsers;
