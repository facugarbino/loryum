import * as React from "react";

export default function PostImages({ images }: { images: string[] }) {
  if (images.length === 0) {
    return;
  }
  // Support a max of 4 images
  images = images.slice(0, 4);

  let gridColumns = 1;
  switch (images.length) {
    case 2:
    case 4:
      gridColumns = 2;
      break;
    case 3:
      gridColumns = 3;
  }

  return (
    <div className={`grid gap-4 grid-cols-${gridColumns}`}>
      {images.map((src, index) => (
        <div
          key={index}
          className="relative overflow-hidden rounded-lg shadow-md bg-white max-w-md	"
        >
          <img src={src} className="object-cover h-full w-full" />
        </div>
      ))}
    </div>
  );
}
