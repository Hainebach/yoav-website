import React, { useEffect, useState } from "react";
import Image from "next/image";
import { fetchEntries } from "../../lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ReactMarkdown from "react-markdown";
import { FaInstagram } from "react-icons/fa";

export default function About() {
  const [info, setInfo] = useState(null);
  const [activeSection, setActiveSection] = useState("about");

  useEffect(() => {
    const getInfo = async () => {
      const entries = await fetchEntries("about");
      setInfo(entries[0]);
    };
    getInfo();
  }, []);

  if (!info) {
    return <div>Loading...</div>;
  }

  const { name, about, statement, email, image, cv, instagramLink } =
    info.fields;
  const sections = {
    about: documentToReactComponents(about),
    statement: documentToReactComponents(statement),
    cv: <ReactMarkdown>{cv}</ReactMarkdown>,
  };

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
  };

  const getTitle = (key) => {
    if (key === "cv") {
      return "CV";
    }
    return key.charAt(0).toUpperCase() + key.slice(1);
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-full max-w-lg p-8 rounded shadow-md">
        <div className="flex justify-center pb-4">
          <Image
            src={`https:${image.fields.file.url}`}
            alt={name}
            objectFit="cover"
            width={300}
            height={300}
            className="rounded"
          />
        </div>
        {Object.keys(sections).map((key) => (
          <div className="mb-4" key={key}>
            <h3
              className="  hover:font-semibold cursor-pointer"
              onClick={() => toggleSection(key)}
            >
              {getTitle(key)}
            </h3>
            {activeSection === key && (
              <div className="text-sm font-light">{sections[key]}</div>
            )}
          </div>
        ))}
        {instagramLink && (
          <div className="mt-4 flex justify-center">
            <a
              href={instagramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-700 hover:text-gray-900"
            >
              <FaInstagram size={30} />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
