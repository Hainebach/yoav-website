import React from "react";
import { fetchEntries } from "../../lib/contentful";
import { useEffect, useState } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ReactMarkdown from "react-markdown";
import Link from "next/link";
import { FaInstagram } from "react-icons/fa";

export default function About() {
  const [info, setInfo] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

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

  const toggleSection = (section) => {
    setActiveSection(activeSection === section ? null : section);
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
          />
        </div>
        <div className="mb-4">
          <h3
            className="text-xl font-semibold cursor-pointer"
            onClick={() => toggleSection("about")}
          >
            About
          </h3>
          {activeSection === "about" && (
            <div>{documentToReactComponents(about)}</div>
          )}
        </div>
        <div className="mb-4">
          <h3
            className="text-xl font-semibold cursor-pointer"
            onClick={() => toggleSection("statement")}
          >
            Statement
          </h3>
          {activeSection === "statement" && (
            <div>{documentToReactComponents(statement)}</div>
          )}
        </div>
        <div className="mb-4">
          <h3
            className="text-xl font-semibold cursor-pointer"
            onClick={() => {
              toggleSection("cv");
            }}
          >
            CV
          </h3>
          {activeSection === "cv" && <ReactMarkdown>{cv}</ReactMarkdown>}
        </div>
        <div className="mt-4 flex justify-center">
          <a
            href={instagramLink}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900"
          >
            <FaInstagram size={30} />
          </a>
        </div>
      </div>
    </div>
  );
}
