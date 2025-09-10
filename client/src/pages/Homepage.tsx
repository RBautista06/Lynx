import ActiveUsers from "../component/ActiveUsers";
import PostFeed from "../component/PostComponents/PostFeed";
import Sidebar from "../component/Sidebar";

const Homepage = () => {
  return (
    <div className="flex items-center justify-center  h-full">
      <div className="bg-base-100 rounded-lg shadow-cl w-full  h-full">
        <div className="flex h-full rounded-lg overflow-hidden">
          <Sidebar />
          <PostFeed />
          <ActiveUsers />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
