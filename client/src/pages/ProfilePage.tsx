import { useSelector } from "react-redux";
import ActiveUsers from "../component/ActiveUsers";
import Sidebar from "../component/Sidebar";
import { userAuth } from "../store/storeSlice/authSlice";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  const { user, isLoading } = useSelector(userAuth);
  return (
    <div className="flex items-center justify-center  h-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <div className=" h-full w-7xl flex justify-center">
            <div className=" w-4xl  py-10 px-5 flex flex-col gap-10">
              <div className="">
                {/* user details */}
                <div className="flex px-5 gap-10 items-center">
                  <div className="size-43 rounded-full overflow-hidden shadow-2xl">
                    <img
                      src={user?.profilePic || "./img/avatar.png"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex flex-col gap-5 justify-center">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-2xl">
                        {user?.username}
                      </span>
                      <Link
                        to="/edit-profile"
                        className="px-5 py-2 bg-base-300 rounded-lg">
                        Edit Profile
                      </Link>
                    </div>

                    <div className="flex gap-10">
                      {/* number of posts */}
                      <div className="flex gap-2">
                        <span className="font-semibold">3</span>{" "}
                        <p className="opacity-50">posts</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold">169</span>{" "}
                        <p className="opacity-50">followers</p>
                      </div>
                      <div className="flex gap-2">
                        <span className="font-semibold">10</span>{" "}
                        <p className="opacity-50">following</p>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <span className="font-semibold">{user?.fullName}</span>
                      <p>{user?.bio}</p>
                    </div>
                  </div>
                </div>
                {/* user posts */}
              </div>
              <div className="border h-100">posts here</div>
            </div>
          </div>
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
