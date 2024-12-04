import { Post } from "./models/post";

export const mockPost: Post = {
  id: "1234567890",
  user: {
    name: "test",
    avatarUrl: "https://picsum.photos/50/50",
  },
  date: new Date(),
  comments: 5,
  images: [],
  text: "Lorem ipsum",
};
