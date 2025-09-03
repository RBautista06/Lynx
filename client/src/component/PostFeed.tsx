import { useSelector } from "react-redux";
import { userAuth } from "../store/storeSlice/authSlice";
import CreatePost from "./CreatePost.tsx";
import Post from "./Post.tsx";

const PostFeed = () => {
  const { user } = useSelector(userAuth);

  return (
    <div className=" h-auto w-7xl flex justify-center l">
      <div
        className=" w-3xl px-5 py-7  overflow-y-scroll "
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}>
        <div className="h-full w-full flex flex-col gap-5 relative">
          <CreatePost
            profilePicture={user?.profilePic ?? ""}
            username={user?.username ?? ""}
          />
          <Post />
          <Post />
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
