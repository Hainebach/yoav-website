import { useState, useEffect, useCallback } from "react";
import { fetchEntries } from "../../../lib/contentful";
import Image from "next/image";
import Link from "next/link";

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
  const projects = entries.filter((entry) => entry.fields.slug !== params.slug);

  return {
    props: { project },
  };
}

export default function ProjectPage({ project, projects }) {
  const { title, image, year, size, technique, tags } = project.fields;
  const [selectedImage, setSelectedImage] = useState(null);
  console.log("project fields: ", project.fields);

  const handleClick = (index) => {
    setSelectedImage(index);
  };

  const handleClose = () => {
    setSelectedImage(null);
  };

  const handleNext = useCallback(() => {
    setSelectedImage((prevIndex) => (prevIndex + 1) % image.length);
  }, [image.length]);

  const handlePrev = useCallback(() => {
    setSelectedImage(
      (prevIndex) => (prevIndex - 1 + image.length) % image.length
    );
  }, [image.length]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (selectedImage !== null) {
        switch (event.key) {
          case "ArrowRight":
            handleNext();
            break;
          case "ArrowLeft":
            handlePrev();
            break;
          case "Escape":
            handleClose();
            break;
          default:
            break;
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedImage, handleNext, handlePrev]);
  return (
    <>
      <div className="sticky top-0 bg-[rgb(var(--background-rgb))]  pt-2">
        <h1 className="text-3xl font-bold mb-4">{title}</h1>
        <p className="text-sm mb-4">
          {technique} {year && `| ${year}`}
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {image.map((img, index) => (
          <Image
            key={img.sys.id || index}
            src={`https:${img.fields.file.url}`}
            alt={title}
            loading="lazy"
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
            className="absolute inset-0 bg-background-color-opacity"
            onClick={handleClose}
          ></div>
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 text-gray text-2xl z-50"
          >
            ×
          </button>
          <button
            onClick={handlePrev}
            className="absolute left-4 text-gray text-2xl z-50"
          >
            ‹
          </button>
          <div className="relative w-3/4 h-3/4 pb-2 bg-transparent flex items-center justify-center">
            <Image
              src={`https:${image[selectedImage].fields.file.url}`}
              alt={title}
              fill
              style={{ objectFit: "contain" }}
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-7 text-center text-gray z-50 bg-transparent p-4">
            <h2 className="text-lg font-bold pt-4">
              {image[selectedImage].fields.title}
            </h2>
            <p className="text-sm">{image[selectedImage].fields.description}</p>
          </div>
          <button
            onClick={handleNext}
            className="absolute right-4 text-gray text-2xl z-50"
          >
            ›
          </button>
        </div>
      )}
      <footer className="mt-8">
        <div className="flex overflow-x-auto space-x-4 justify-around">
          {projects
            .filter((proj) => proj.fields.slug !== project.fields.slug)
            .map((proj) => (
              <Link
                key={proj.sys.id}
                href={`/projects/${proj.fields.slug}`}
                className="block flex-shrink-0"
              >
                <Image
                  src={`https:${proj.fields.thumbnail.fields.file.url}`}
                  alt={proj.fields.title}
                  className="w-24 h-24 object-cover"
                  width={96}
                  height={96}
                />
              </Link>
            ))}
        </div>
      </footer>
    </>
  );
}
