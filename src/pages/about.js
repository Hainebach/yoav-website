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
    <>
      <h1> about {name}</h1>
      <Image
        src={`https:${image.fields.file.url}`}
        alt={name}
        objectFit="cover"
        width={96}
        height={96}
      />
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
    </>
  );
}
