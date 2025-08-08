import { ChevronLeft, ChevronRight, Ellipsis } from "lucide-react";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <div className="bg-base-200 rounded-xl p-5 flex flex-col gap-5">
      <div className="flex justify-between">
        <div className="flex gap-4">
          <div className="rounded-full size-12 ">
            <img
              src="./img/avatar.png"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-4 items-center">
              <Link to="/">
                <span className="font-semibold"> railleyyy</span>
              </Link>
              <button className="text-primary font-semibold text-sm">
                • Follow
              </button>
            </div>
            <span className="opacity-50 text-sm">August 8, 2025, 7:25pm</span>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-1">
            <Ellipsis />
          </button>
        </div>
      </div>
      <div className="w-full flex items-center gap-4">
        <button className="btn rounded-full size-8 p-0 bg-base-100 ">
          <ChevronLeft size={16} />
        </button>
        <div
          style={{ aspectRatio: "1/1.2" }}
          className="overflow-hidden rounded-lg border border-b-gray-400">
          <img
            src="./img/sampleimg.png"
            className="object-cover w-full h-full"
          />
        </div>
        <button className="btn rounded-full size-8 p-0 bg-base-100 ">
          <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
};

export default Post;
