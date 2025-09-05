import {
  Bookmark,
  Earth,
  Ellipsis,
  Heart,
  Lock,
  MessageCircle,
  Send,
  Users,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";
import CaptionText from "./CaptionText";
import type { PostProp } from "./propTypes/postTypes";
import { formatMessageTime } from "../utils/TImeFormatter";
import ImageSlider from "./ImageSlider";

type postProps = {
  post: PostProp;
};
const Post = ({ post }: postProps) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);

  const privacyRender = () => {
    if (post.privacy === "Private") {
      return (
        <span>
          <Lock size={16} />
        </span>
      );
    } else if (post.privacy === "Followers") {
      return (
        <span>
          <Users size={16} />
        </span>
      );
    } else {
      return (
        <span>
          <Earth size={16} />
        </span>
      );
    }
  };

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
          <div className="rounded-full size-12 overflow-hidden">
            <img
              src={post.author.profilePic || "/img/avatar.png"}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col">
            <div className="flex gap-4 items-center">
              <Link to="/">
                <span className="font-semibold">{post.author.username}</span>
              </Link>
              <button className="text-primary font-semibold text-sm cursor-pointer hover:scale-105 transition-all duration-300">
                • Follow
              </button>
            </div>
            <div className="flex gap-2 opacity-50 items-center">
              <span className=" text-sm">
                {formatMessageTime(post.createdAt)}
              </span>
              {privacyRender()}
            </div>
          </div>
        </div>
        <div className="flex items-center">
          <button className="p-1">
            <Ellipsis />
          </button>
        </div>
      </div>
      {/* images uploaded */}
      <ImageSlider media={post.media} />
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
          <CaptionText text={post.caption} />
        </div>
      </div>
    </div>
  );
};

export default Post;
