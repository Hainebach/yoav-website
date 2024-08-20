import Image from "next/image";
import Link from "next/link";

export default function Footer({ projects, project }) {
  return (
    <footer className="mt-10 p-4 border-t border-t-secondaryGray">
      <div className="flex overflow-x-auto space-x-5 justify-around ">
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
                className="w-24 h-24 object-cover p-1"
                width={96}
                height={96}
              />
            </Link>
          ))}
      </div>
    </footer>
  );
}
