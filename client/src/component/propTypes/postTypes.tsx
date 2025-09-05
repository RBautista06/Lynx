export interface Comment {
  comment: string;
  author: string; // could also be ObjectId if populated
  createdAt: string; // Dates come as strings in JSON
}
interface author {
  _id: string;
  username: string;
  profilePic: string;
}
export interface PostProp {
  _id: string;
  author: author; // ObjectId reference to User
  caption?: string;
  likes: string[];
  comments: Comment[];
  media: string[];
  privacy: "Public" | "Followers" | "Private";
  createdAt: string;
  updatedAt: string;
}
