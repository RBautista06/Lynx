import { ChevronDown, Earth, Images, Lock, Users, X } from "lucide-react";
import { useState } from "react";

interface PostProps {
  profilePicture: string;
  username: string;
}
const CreatePost = (props: PostProps) => {
  const profileImage = props.profilePicture || "./img/avatar.png";
  const [isClicked, setIsClicked] = useState(false);
  const [privacy, setPrivacy] = useState("Public");
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const privacyhandler = (privacy: string) => {
    setPrivacy(privacy);
    setIsSelectClicked(!isSelectClicked);
  };
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
        <div className="fixed inset-0 bg-base-300/50 bg-opacity-50 flex items-center justify-center z-50 ">
          <div className="h-200 w-full max-w-2xl p-5 rounded-lg bg-base-100 shadow-lg flex flex-col gap-3 relative">
            <span
              onClick={() => setIsClicked(false)}
              className="cursor-pointer opacity-70 position absolute right-3 top-3">
              <X size={20} />
            </span>
            <div className="flex justify-center items-center p-2 opacity-80 border-b">
              <span className="text-lg font-bold ">Create Post</span>
            </div>
            {/* form */}
            <form action="">
              {/* profile and privacy section */}
              <div className="flex gap-4 items-center">
                <div className="size-12 rounded-full overflow-hidden">
                  <img
                    src={profileImage}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="flex flex-col gap-1 relative">
                  <span className="font-semibold">{props.username}</span>
                  <div
                    className={`border  justify-between  px-2  py-1 flex gap-4 items-center rounded-md border-gray-50/30 transition-all duration-300 ${
                      isSelectClicked ? "w-30" : ""
                    }`}
                    onClick={() => setIsSelectClicked(!isSelectClicked)}>
                    <div className="flex gap-2 items-center">
                      {privacy === "Public" ? (
                        <Earth size={14} />
                      ) : privacy === "Followers" ? (
                        <Users size={14} />
                      ) : (
                        <Lock size={14} />
                      )}
                      <span className="text-sm font-semibold">{privacy}</span>
                    </div>
                    <ChevronDown
                      size={18}
                      className={`transition-transform duration-300 ${
                        isSelectClicked ? "rotate-180" : "rotate-0"
                      }`}
                    />
                  </div>
                  {isSelectClicked && (
                    <div className="flex w-full flex-col absolute top-14 rounded-md border border-gray-50/30 overflow-hidden">
                      <div
                        className="flex gap-2 items-center hover:bg-base-200 w-full px-2 py-1"
                        onClick={() => privacyhandler("Public")}>
                        <Earth size={14} />
                        <span className="text-sm">Public</span>
                      </div>
                      <div
                        className="flex gap-2 items-center hover:bg-base-200 w-full px-2 py-1"
                        onClick={() => privacyhandler("Followers")}>
                        <Users size={14} />
                        <span className="text-sm">Followers</span>
                      </div>
                      <div
                        className="flex gap-2 items-center hover:bg-base-200 w-full px-2 py-1"
                        onClick={() => privacyhandler("Private")}>
                        <Lock size={14} />
                        <span className="text-sm">Private</span>
                      </div>
                    </div>
                  )}
                </div>
                {/* form end */}
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default CreatePost;
