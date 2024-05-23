import React, { useEffect, useState } from "react";
import { fetchEntries } from "@../../../lib/contentful";
import Image from "next/image";

export default function Work() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const entries = await fetchEntries("images");
      setProjects(entries);
    };
    getProjects();
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6">
      {projects.map((project) => (
        <a
          key={project.sys.id}
          href={`/projects/${project.fields.slug}`}
          className="block"
        >
          <Image
            src={`https:${project.fields.thumbnail.fields.file.url}`}
            alt={project.fields.title}
            className="w-full h-auto"
            width={project.fields.thumbnail.fields.file.details.image.width}
            height={project.fields.thumbnail.fields.file.details.image.height}
          />
        </a>
      ))}
    </div>
  );
}
