import { Images, X } from "lucide-react";
import { useState } from "react";

interface PostProps {
  profilePicture: string;
  username: string;
}
const CreatePost = (props: PostProps) => {
  const profileImage = props.profilePicture || "./img/avatar.png";
  const [isClicked, setIsClicked] = useState(false);
  return (
    <>
      {/* this is for the small part of create post */}
      <div
        className="w-full h-2xl bg-base-200 flex flex-col p-5 rounded-xl select-none"
        onClick={() => setIsClicked(!isClicked)}>
        <div className="flex gap-3 items-center">
          <div className="size-12 rounded-full overflow-hidden">
            <img src={profileImage} className="h-full w-full object-cover" />
          </div>
          <div className="flex-1 h-full">
            <div className="h-full w-full rounded-full py-2 px-4 bg-base-100 text-left items-center flex ">
              <p className="opacity-70">
                {"Whats on your mind, " + props.username + "?"}
              </p>
            </div>
          </div>
          <button className="btn h-full btn-sm bg-base-100 rounded-full">
            <Images />
          </button>
        </div>
      </div>

      {/* this is for the modal */}
      {isClicked && (
        <div className="fixed inset-0 bg-base-300/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="h-auto w-full max-w-2xl p-5 rounded-lg bg-base-100 shadow-lg flex flex-col gap-3">
            <div className="flex justify-end">
              <span
                onClick={() => setIsClicked(false)}
                className="cursor-pointer opacity-70">
                <X />
              </span>
            </div>
            {/* profile and privacy section */}
            <div className="flex gap-4">
              <div className="size-12 rounded-full overflow-hidden">
                <img
                  src={profileImage}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex flex-col gap-2">
                <span>{props.username}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
