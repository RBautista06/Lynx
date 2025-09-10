import { Images } from "lucide-react";
import type { PostProps } from "./CreatePost";

const CreatePostDialog = (props: PostProps) => {
  return (
    <div className="flex gap-3 items-center">
      <div className="size-12 rounded-full overflow-hidden">
        <img
          src={props.profilePicture}
          className="h-full w-full object-cover"
        />
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
  );
};

export default CreatePostDialog;
