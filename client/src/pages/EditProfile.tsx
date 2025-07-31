import { useSelector } from "react-redux";
import ActiveUsers from "../component/ActiveUsers";
import Sidebar from "../component/Sidebar";
import { userAuth } from "../store/storeSlice/authSlice";
import { Link } from "react-router-dom";
import { PencilIcon } from "lucide-react";

const EditProfile = () => {
  const { user, isLoading } = useSelector(userAuth);
  return (
    <div className="flex items-center justify-center  h-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <div className=" h-full w-7xl flex justify-center">
            <div className="border w-4xl  py-10 px-5 flex flex-col gap-5">
              <form action="">
                <div className="flex justify-between items-center p-5 rounded-xl bg-base-300">
                  <div className="flex gap-10 justify-center">
                    <div className="size-20 rounded-full overflow-hidden object-cover">
                      <img src="./img/avatar.png" className="w-full h-full" />
                    </div>
                    <div className="flex flex-col justify-center">
                      <span className="font-semibold text-lg">
                        {user?.username}
                      </span>
                      <span className="opacity-80">{user?.fullName}</span>
                    </div>
                  </div>
                  <label
                    htmlFor="profilePic"
                    className="h-full cursor-pointer flex justify-center items-center gap-3 p-3 rounded-xl bg-primary/50 text-white hover:bg-primary transition">
                    <span>Change Photo</span>
                    <PencilIcon className="size-5" />
                    <input
                      type="file"
                      id="profilePic"
                      name="profilePic"
                      accept="image/*"
                      className="hidden"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          console.log("Selected file:", file);
                        }
                      }}
                    />
                  </label>
                </div>
              </form>
            </div>
          </div>
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
