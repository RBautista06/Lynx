import {
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Heart,
  MessageCircle,
  Send,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CaptionText from "./CaptionText";

const Post = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked);
  };

  const handleSave = () => {
    setIsSaved(!isSaved);
  };

  return (
    <div className="bg-base-200 rounded-xl p-5 flex flex-col gap-5">
      {/* post header */}
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
              <button className="text-primary font-semibold text-sm cursor-pointer hover:scale-105 transition-all duration-300">
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
      {/* images uploaded */}
      <div className="w-full flex items-center gap-4 relative">
        <button className=" absolute btn rounded-full size-8 p-0 bg-base-100 left-3">
          <ChevronLeft size={16} />
        </button>
        <div
          style={{ aspectRatio: "1/1" }}
          className="overflow-hidden rounded-lg border border-b-gray-400">
          <img
            src="./img/sampleimg.png"
            className="object-cover w-full h-full"
          />
        </div>
        <button className="btn rounded-full size-8 p-0 bg-base-100 absolute right-3 ">
          <ChevronRight size={16} />
        </button>
      </div>
      {/* likes comments and save */}
      <div className="flex flex-col gap-2">
        <div className="flex justify-between items center">
          <div className="flex gap-3">
            <button
              onClick={handleLike}
              className="cursor-pointer hover:scale-125 transition-all duration-150">
              <Heart
                size={25}
                fill={isLiked ? "#E43636" : "none"}
                stroke={isLiked ? "#E43636" : "white"}
              />
            </button>
            <button className="cursor-pointer hover:scale-125 transition-all duration-150">
              <MessageCircle size={25} />
            </button>
            <button className="cursor-pointer hover:scale-125 transition-all duration-150">
              <Send size={25} />
            </button>
          </div>
          <button
            onClick={handleSave}
            className="cursor-pointer hover:scale-125 transition-all duration-150">
            <Bookmark
              size={25}
              fill={isSaved ? "#FFD700" : "none"}
              stroke={isSaved ? "#FFD700" : "white"}
            />
          </button>
        </div>
        {/* caption comments and commentstraight number of likes*/}
        <div className="flex flex-col">
          <span className="font-semibold">34,456 likes</span>
          {/* caption */}
          <CaptionText text="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
        </div>
      </div>
    </div>
  );
};

export default Post;
