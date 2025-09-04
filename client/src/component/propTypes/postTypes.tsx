export interface Comment {
  comment: string;
  author: string; // could also be ObjectId if populated
  createdAt: string; // Dates come as strings in JSON
}

export interface PostProp {
  _id: string;
  author: string; // ObjectId reference to User
  caption?: string;
  likes: string[];
  comments: Comment[];
  media: string[];
  privacy: "public" | "followers" | "private";
  createdAt: string;
  updatedAt: string;
}
