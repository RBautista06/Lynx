import { Images } from "lucide-react";

interface PostProps {
  profilePicture: string;
  username: string;
}
const CreatePost = (props: PostProps) => {
  const profileImage = props.profilePicture || "./img/avatar.png";
  return (
    <div className="w-full h-2xl bg-base-200 flex flex-col p-5 rounded-xl">
      <div className="flex gap-3 items-center">
        <div className="size-12 rounded-full overflow-hidden">
          <img src={profileImage} className="h-full w-full object-cover" />
        </div>
        <div className="flex-1 h-full">
          <input
            type="text"
            className="h-full w-full rounded-full py-2 px-4 bg-base-100 text-left"
            placeholder={"Whats on your mind, " + props.username + "?"}
          />
        </div>
        <button className="btn h-full btn-sm bg-base-100 rounded-full">
          <Images />
        </button>
      </div>
    </div>
  );
};

export default CreatePost;
