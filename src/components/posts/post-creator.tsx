"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Loader2, MessageCircle, MessageSquare, Trash } from "lucide-react";
import { useState } from "react";
import { ImageUploader } from "./image-uploader";
import { submitPost } from "@/actions/posts";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/context/user-context";
import { usePosts } from "@/context/posts-context";

const IMAGES_LIMIT = 4;
const TEXT_LIMIT = 500;
const IMAGE_SIZE_LIMIT = 1024 * 1024;

export default function PostCreator({
  placeholder,
  postId,
}: {
  placeholder: string;
  postId?: string;
}) {
  const [collapsed, setCollapsed] = useState<boolean>(!!postId);
  const [value, setValue] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const user = useUser();
  const { posts, setPosts } = usePosts();

  const handleNewFiles = (files: File[]) => {
    files = files.slice(0, IMAGES_LIMIT - images.length);
    if (files.some((f) => f.size > IMAGE_SIZE_LIMIT)) {
      files = files.filter((f) => f.size < IMAGE_SIZE_LIMIT);
      toast({
        title: "Files can't exceed 1MB.",
      });
    }
    setImages((images) => [...images, ...files]);
  };

  const handleDeleteFile = (image: File) => {
    setImages((images) => images.filter((i) => i !== image));
  };

  const handlePost = async () => {
    if (!value.trim()) {
      return;
    }

    const entity = postId ? "Comment" : "Post";

    setLoading(true);
    try {
      const newPost = await submitPost(value.trim(), images, postId);
      toast({
        title: `${entity} published`,
      });
      setValue("");
      setImages([]);
      if (postId) {
        setCollapsed(true);
      }
      if (newPost) {
        setPosts([newPost, ...posts]);
      }
    } catch (e) {
      toast({
        title: "Error",
        description: `Your ${entity.toLowerCase()} could not be published`,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleExpand = () => {
    if (user) {
      setCollapsed(false);
    } else {
      toast({
        title: "You must sign in to post.",
      });
    }
  };

  if (collapsed) {
    return (
      <div
        className="flex justify-items-start cursor-pointer max-w-3xl w-full gap-2"
        onClick={handleExpand}
      >
        <MessageSquare />
        {placeholder}
      </div>
    );
  }

  if (!user) {
    if (postId) {
      return;
    }
    return <p>Log in to post</p>;
  }

  return (
    <div className="w-full max-w-3xl m-auto p-4 border">
      <div className="grid w-full gap-2">
        <Textarea
          placeholder={placeholder}
          className="resize-none"
          onChange={(e) => setValue(e.target.value.slice(0, TEXT_LIMIT))}
          id={"post-input"}
        />
        <Label className="text-xs" htmlFor="post-input">
          {value.length} / {TEXT_LIMIT} characters
        </Label>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <ImageUploader
              onFilesUploaded={handleNewFiles}
              disabled={images.length >= 4}
            />
            <div className="flex items-center gap-2">
              {images.map((i) => (
                <div
                  key={i.name}
                  className="relative inline-block bg-foreground"
                >
                  <img src={URL.createObjectURL(i)} className="h-10 w-10" />
                  <button
                    title="Remove image"
                    onClick={() => handleDeleteFile(i)}
                    className="absolute top-0 h-10 w-10 p-2 opacity-0 hover:opacity-100 hover:bg-gray-700 "
                  >
                    <Trash />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <Button disabled={!value.trim() || loading} onClick={handlePost}>
            {loading && <Loader2 className="animate-spin" />}
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
