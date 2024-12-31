"use client";
import Image from "next/image";
import { useState } from "react";

function ImageContainer({ image, name }: { image: string; name: string }) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative mt-6 h-[300px] md:h-[500px]">
        <Image
          src={image}
          fill
          alt={name}
          className="object-cover rounded cursor-pointer"
          priority
          onClick={() => setShowModal(true)}
        />
      </section>
      {showModal && (
        <div
          onClick={() => setShowModal(false)}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
        >
          <div className="relative w-full max-w-4xl h-[80%]">
            <Image
              src={image}
              fill
              alt={name}
              className="object-contain rounded"
              priority
            />
          </div>
        </div>
      )}
    </>
  );
}

export default ImageContainer;
