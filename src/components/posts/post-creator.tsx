"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Accessibility, Image, ImageUp, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import Dropzone from "shadcn-dropzone";
import { ImageUploader } from "./image-uploader";
import { submitPost } from "@/actions/posts";
import { toast, useToast } from "@/hooks/use-toast";
import { setFlagsFromString } from "v8";

const IMAGES_LIMIT = 4;

export default function PostCreator() {
  const [value, setValue] = useState<string>("");
  const [images, setImages] = useState<File[]>([]);
  const { toast } = useToast();

  const handleNewFiles = (files: File[]) => {
    files = files.slice(0, IMAGES_LIMIT - images.length);
    setImages((images) => [...images, ...files]);
  };

  const handleDeleteFile = (image: File) => {
    setImages((images) => images.filter((i) => i !== image));
  };

  const handlePost = async () => {
    await submitPost(value.trim(), images);
    toast({
      title: "Post published",
    });
    setValue("");
    setImages([]);
  };

  return (
    <div className="w-full max-w-3xl m-auto">
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Post your thoughts..."
          className="resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
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
          <Button onClick={handlePost}>Post</Button>
        </div>
      </div>
    </div>
  );
}
