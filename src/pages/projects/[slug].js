import { useState } from "react";
import { fetchEntries } from "../../../lib/contentful";
import Image from "next/image";

export async function getStaticPaths() {
  const entries = await fetchEntries("images");
  const paths = entries.map((entry) => ({
    params: { slug: entry.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const entries = await fetchEntries("images");
  const project = entries.find((entry) => entry.fields.slug === params.slug);

  return {
    props: { project },
  };
}

export default function ProjectPage({ project }) {
  const { title, image, year, size, Technique, tags } = project.fields;
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = () => {
    setSelectedImage((prevIndex) => (prevIndex + 1) % image.length);
  };

  const handlePrev = () => {
    setSelectedImage(
      (prevIndex) => (prevIndex - 1 + image.length) % image.length
    );
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>
      <p className="text-sm mb-4">
        {Technique} | {year}
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {image.map((img, index) => (
          <Image
            key={index}
            src={`https:${img.fields.file.url}`}
            alt={title}
            width={img.fields.file.details.image.width}
            height={img.fields.file.details.image.height}
            className="w-full h-auto cursor-pointer"
            onClick={() => handleClick(index)}
          />
        ))}
      </div>

      {selectedImage !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div
            className="absolute inset-0 bg-black bg-opacity-75"
            onClick={handleClose}
          ></div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-white text-2xl z-50"
          >
            ×
          </button>
          <button
            onClick={handlePrev}
            className="absolute left-4 text-white text-2xl z-50"
          >
            ‹
          </button>
          <div className="relative w-3/4 h-3/4 bg-transparent flex items-center justify-center">
            <Image
              src={`https:${image[selectedImage].fields.file.url}`}
              alt={title}
              layout="fill"
              objectFit="contain"
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-10 text-center text-white z-50 bg-transparent p-4">
            <h2 className="text-lg font-bold">
              {image[selectedImage].fields.title}
            </h2>
            <p className="text-sm">{image[selectedImage].fields.description}</p>
          </div>
          <button
            onClick={handleNext}
            className="absolute right-4 text-white text-2xl z-50"
          >
            ›
          </button>
        </div>
      )}
    </div>
  );
}
