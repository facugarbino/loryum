"use client";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Accessibility, Image, ImageUp } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Dropzone from "shadcn-dropzone";

export const ImageUploader = ({
  onFilesUploaded,
  disabled,
}: {
  onFilesUploaded: (files: File[]) => void;
  disabled: boolean;
}) => {
  const fileInput = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    fileInput.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      onFilesUploaded(Array.from(event.target.files));
      event.target.value = ""; //reset value to allow uploading the same file again
    }
  };

  return (
    <>
      <Button
        disabled={disabled}
        onClick={handleClick}
        className="flex items-center gap-2"
      >
        <ImageUp className="h-16 w-16" />
        Upload images
      </Button>
      <input
        type="file"
        multiple
        accept="image/*"
        onChange={handleChange}
        ref={fileInput}
        style={{ display: "none" }}
      />
    </>
  );
};
