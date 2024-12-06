export interface Post {
  id: string;
  user: {
    id: string;
    name: string;
    username: string;
    avatarUrl: string;
  };
  date: Date;
  comments: number;
  images: { url: string }[];
  content: string;
}
