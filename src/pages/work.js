import React, { useEffect, useState } from "react";
import { fetchEntries } from "@../../../lib/contentful";
import Image from "next/image";
import Link from "next/link";

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
        <Link
          key={project.sys.id}
          href={`/projects/${project.fields.slug}`}
          className="block"
        >
          <div className="relative w-full pb-full overflow-hidden">
            <Image
              src={`https:${project.fields.thumbnail.fields.file.url}`}
              alt={project.fields.title}
              className="w-full h-auto"
              objectFit="cover"
              width={300}
              height={300}
            />
          </div>
          <h2 className="text-center mt-2">{project.fields.title}</h2>
        </Link>
      ))}
    </div>
  );
}
