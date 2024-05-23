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

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-4">{title}</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {image.map((img, index) => (
          <Image
            key={index}
            src={`https:${img.fields.file.url}`}
            alt={title}
            width={img.fields.file.details.image.width}
            height={img.fields.file.details.image.height}
            className="w-full h-auto"
          />
        ))}
      </div>
    </div>
  );
}
