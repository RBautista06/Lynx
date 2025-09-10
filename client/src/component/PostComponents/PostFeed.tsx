import { useDispatch, useSelector } from "react-redux";
import CreatePost from "./CreatePost.tsx";
import Post from "./Post.tsx";
// import type { PostProp } from "./propTypes/postTypes.tsx";
import { useEffect } from "react";
import { toast } from "sonner";
import { userAuth } from "../../store/storeSlice/authSlice.ts";
import PostSkeleton from "../skeletons/PostSkeleton.tsx";
import type { AppDispatch } from "../../store/store.ts";
import { getPosts, postRoute } from "../../store/storeSlice/postSlice.ts";
const PostFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(userAuth);
  const { posts, isGetPostLoading, error } = useSelector(postRoute);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  {
    error && toast.error(error);
  }
  return (
    <div
      className=" h-auto w-7xl flex justify-center l overflow-y-scroll"
      style={{
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // IE 10+
      }}>
      <div className=" w-3xl px-5 py-7 ">
        <div className="h-full w-full flex flex-col gap-5 relative ">
          {isGetPostLoading && <PostSkeleton />}
          {!isGetPostLoading && (
            <CreatePost
              profilePicture={user?.profilePic ?? ""}
              username={user?.username ?? ""}
            />
          )}
          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
