export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  date: string;
  comments: number;
  images: { url: string }[];
  content: string;
}
