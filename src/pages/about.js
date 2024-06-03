import React from "react";
import { fetchEntries } from "../../lib/contentful";
import { useEffect, useState } from "react";
import Image from "next/image";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import ReactMarkdown from "react-markdown";

export default function About() {
  const [info, setInfo] = useState(null);

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

  const { name, about, statement, email, image, cv } = info.fields;
  console.log("name: ", name);
  console.log("about: ", about);
  console.log("email: ", email);
  console.log("statement: ", statement);
  console.log("cv: ", cv);
  console.log("image: ", image);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {/* <h1> about {name}</h1> */}
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
          <h2 className="text-2xl font-semibold">About</h2>
          <div>{documentToReactComponents(about)}</div>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">Statement</h2>
          <div>{documentToReactComponents(statement)}</div>
        </div>
        <div className="mb-4">
          <h2 className="text-2xl font-semibold">CV</h2>
          <ReactMarkdown>{cv}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
