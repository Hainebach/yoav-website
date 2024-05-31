import Header from "@/component/Header";
import "@/styles/Header.css";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchEntries } from "@../../../lib/contentful";

export default function App({ Component, pageProps }) {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const getProjects = async () => {
      const entries = await fetchEntries("images");
      setProjects(entries);
    };
    getProjects();
  }, []);
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  return (
    <>
      {!isIndexPage && <Header />}
      <main className={`${isIndexPage ? "" : "py-6 px-12 mt-10"}`}>
        <Component {...pageProps} projects={projects} />
      </main>
    </>
  );
}
