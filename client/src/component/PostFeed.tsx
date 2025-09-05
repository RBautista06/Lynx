import { useDispatch, useSelector } from "react-redux";
import { userAuth } from "../store/storeSlice/authSlice";
import CreatePost from "./CreatePost.tsx";
import Post from "./Post.tsx";
// import type { PostProp } from "./propTypes/postTypes.tsx";
import { getPosts, postRoute } from "../store/storeSlice/postSlice.ts";
import { useEffect } from "react";
import type { AppDispatch } from "../store/store.ts";
const PostFeed = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector(userAuth);
  const { posts, isGetPostLoading, error } = useSelector(postRoute);

  useEffect(() => {
    dispatch(getPosts());
  }, [dispatch]);

  // const examplePost: PostProp = {
  //   _id: "123",
  //   author: "456",
  //   caption: "Hello world",
  //   likes: ["111", "222"],
  //   comments: [
  //     { comment: "Nice!", author: "111", createdAt: new Date().toISOString() },
  //   ],
  //   media: ["./img/sampleimg.png", "./img/sampleimg.png"],
  //   privacy: "public",
  //   createdAt: new Date().toISOString(),
  //   updatedAt: new Date().toISOString(),
  // };

  return (
    <div className=" h-auto w-7xl flex justify-center l">
      <div
        className=" w-3xl px-5 py-7  overflow-y-scroll "
        style={{
          scrollbarWidth: "none", // Firefox
          msOverflowStyle: "none", // IE 10+
        }}>
        <div className="h-full w-full flex flex-col gap-5 relative ">
          <CreatePost
            profilePicture={user?.profilePic ?? ""}
            username={user?.username ?? ""}
          />
          {/* <Post post={examplePost} /> */}

          {isGetPostLoading && <p>Loading...</p>}
          {error && <p className="text-red-500">{error}</p>}

          {posts?.map((post) => (
            <Post key={post._id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default PostFeed;
