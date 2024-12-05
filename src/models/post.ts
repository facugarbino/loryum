export interface Post {
  id: string;
  user: {
    name: string;
    userName: string;
    avatarUrl: string;
  };
  date: Date;
  comments: number;
  images: string[];
  content: string;
}
