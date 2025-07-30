import ActiveUsers from "../component/ActiveUsers";
import Sidebar from "../component/Sidebar";

const ProfilePage = () => {
  return (
    <div className="flex items-center justify-center  h-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <div className=" h-full w-7xl flex justify-center">
            <div className=" w-4xl border">
              Profile PAge
            </div>
          </div>
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
