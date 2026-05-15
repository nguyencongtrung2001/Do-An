"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageGalleryProps {
  images: string[];
  courtName: string;
}

export default function ImageGallery({ images, courtName }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || "/images/categories/soccer.svg");

  return (
    <div className="flex flex-col gap-4">
      <div className="w-full h-64 md:h-96 relative rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-gray-800">
        <Image src={mainImage} alt={courtName} fill className="object-cover" />
      </div>
      {images.length > 1 && (
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {images.map((img, idx) => (
            <button 
              key={idx} 
              onClick={() => setMainImage(img)}
              className={`relative w-24 h-24 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                mainImage === img ? "border-primary shadow-md scale-105" : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={img} alt={`${courtName} ${idx + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
