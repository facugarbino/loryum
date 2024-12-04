export interface Post {
  id: string;
  user: {
    name: string;
    avatarUrl: string;
  };
  date: Date;
  comments: number;
  images: string[];
  text: string;
}
