import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Work({ projects }) {
  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
      key="work"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
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
    </motion.div>
  );
}
