import { ChevronDown, Earth, Lock, Plus, Users, X } from "lucide-react";
import { useRef, useState } from "react";
import CreatePostDialog from "./CreatePostDialog";
import ImageSlider from "./ImageSlider";

export interface PostProps {
  profilePicture: string;
  username: string;
}
const CreatePost = (props: PostProps) => {
  const profileImage = props.profilePicture || "./img/avatar.png";
  const [isClicked, setIsClicked] = useState(true);
  const [privacy, setPrivacy] = useState<string>("Public");
  const [isSelectClicked, setIsSelectClicked] = useState(false);

  const [caption, setCaption] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handlefileInput = () => {
    fileInputRef.current?.click(); // to trigger the hidden input
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const urls = Array.from(files).map((file) => URL.createObjectURL(file));
    setImages((prev) => [...prev, ...urls]);

    e.target.value = ""; // ✅ reset so same file can be reselected
  };

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
        <CreatePostDialog
          profilePicture={profileImage}
          username={props?.username ?? ""}
        />
      </div>

      {/* this is for the modal */}
      {isClicked && (
        <form action="">
          <div className="fixed inset-0 bg-base-300/80 bg-opacity-50 flex justify-center items-center z-50 ">
            <div
              className="w-full max-w-xl p-5  rounded-lg bg-base-100 shadow-lg flex flex-col gap-3 relative mt-10 mb-10 max-h-[90vh] overflow-y-auto"
              style={{
                scrollbarWidth: "none", // Firefox
                msOverflowStyle: "none", // IE 10+
              }}>
              <span
                onClick={() => setIsClicked(false)}
                className="cursor-pointer opacity-70 position absolute right-3 top-3">
                <X size={20} />
              </span>
              <div className="flex justify-center items-center p-2 opacity-80 border-b ">
                <span className="text-lg font-bold ">Create Post</span>
              </div>
              {/* form */}

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
                    className={`border  bg-gray-700 justify-between  px-2  py-1 flex gap-4 items-center rounded-md border-gray-50/30 transition-all duration-300 ${
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
                    <div className="flex w-full flex-col absolute top-16 rounded-md border border-gray-50/30 overflow-hidden z-100 bg-gray-700">
                      <div
                        className="flex gap-2 items-center hover:bg-base-200 w-full px-2 py-2"
                        onClick={() => privacyhandler("Public")}>
                        <Earth size={14} />
                        <span className="text-sm">Public</span>
                      </div>
                      <div
                        className="flex gap-2 items-center hover:bg-base-200 w-full px-2 py-2"
                        onClick={() => privacyhandler("Followers")}>
                        <Users size={14} />
                        <span className="text-sm">Followers</span>
                      </div>
                      <div
                        className="flex gap-2 items-center hover:bg-base-200 w-full px-2 py-2"
                        onClick={() => privacyhandler("Private")}>
                        <Lock size={14} />
                        <span className="text-sm">Private</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="min-h-30 flex flex-col gap-5">
                <textarea
                  spellCheck={false}
                  maxLength={150}
                  onChange={(e) => setCaption(e.target.value)}
                  placeholder={`What's on your mind, ${props.username}?`}
                  className="textarea textarea-ghost w-full text-xl focus:outline-none focus:ring-0 align-top resize-none overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
                />
                {images.length > 0 && (
                  <div className="w-full aspect-square">
                    <ImageSlider
                      media={images}
                      allowRemove="yes"
                      onRemove={(index) =>
                        setImages((prev) => prev.filter((_, i) => i !== index))
                      }
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  onClick={handlefileInput}
                  type="button"
                  className="px-4 py-2 bg-base-300 text-white rounded-md hover:bg-base-200 transition flex gap-2 justify-center items-center">
                  <Plus size={18} /> Images
                </button>
                <button className="btn btn-primary w-full text-lg tracking-wider">
                  Post
                </button>
                {/* padding botton doesnt work but this does */}
                {images.length > 0 && (
                  <div className="h-20 text-base-100">asd</div>
                )}
              </div>
              {/* form end */}
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default CreatePost;
