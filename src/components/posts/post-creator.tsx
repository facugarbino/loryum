"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Image } from "lucide-react";
import { useState } from "react";

export default function PostCreator() {
  const [value, setValue] = useState<string>("");

  return (
    <div className="w-full max-w-3xl m-auto">
      <div className="grid w-full gap-4">
        <Textarea
          placeholder="Post your thoughts..."
          className="resize-none"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <div className="flex items-center justify-between p-2">
          <Button>
            Add images
            <Image></Image>
          </Button>
          <Button onClick={() => alert(value)}>Post</Button>
        </div>
      </div>
    </div>
  );
}
