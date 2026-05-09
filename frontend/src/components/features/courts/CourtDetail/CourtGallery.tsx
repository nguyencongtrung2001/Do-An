"use client";

import { useState } from "react";
import Image from "next/image";

interface CourtGalleryProps {
  images: string[];
  locationName: string;
}

export default function CourtGallery({ images, locationName }: CourtGalleryProps) {
  const [activeImage, setActiveImage] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <section className="w-full bg-white">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 h-[300px] md:h-[450px] rounded-2xl overflow-hidden">
          {/* Main large image */}
          <div
            className="md:col-span-2 md:row-span-2 relative group cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setActiveImage(0)}
          >
            <Image
              src={images[activeImage] || "/hero-stadium.png"}
              alt={locationName}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent" />
          </div>
          {/* Thumbnail images */}
          {images.slice(1, 5).map((img, idx) => (
            <div
              key={idx}
              className={`relative rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                activeImage === idx + 1
                  ? "ring-4 ring-primary shadow-lg"
                  : "hover:ring-2 hover:ring-primary/50"
              }`}
              onClick={() => setActiveImage(idx + 1)}
            >
              <Image
                src={img}
                alt={`${locationName} - ${idx + 2}`}
                fill
                sizes="(max-width: 768px) 25vw, 15vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
        {/* Image counter */}
        {images.length > 1 && (
          <div className="flex items-center justify-center mt-3 text-sm text-slate-500">
            <span className="material-symbols-outlined text-base mr-1">photo_library</span>
            {images.length} ảnh
          </div>
        )}
      </div>
    </section>
  );
}
