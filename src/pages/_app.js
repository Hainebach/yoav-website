import Header from "@/components/Header";
import "@/styles/Header.css";
import "@/styles/globals.css";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { fetchEntries } from "@../../../lib/contentful";
import { AnimatePresence, motion } from "framer-motion";
import Head from "next/head";
import { Space_Mono } from "next/font/google";

const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-space_mono",
  display: "swap",
});

export default function App({ Component, pageProps }) {
  const [projects, setProjects] = useState([]);
  const [favicon, setFavicon] = useState(null);
  const router = useRouter();
  const isIndexPage = router.pathname === "/";

  useEffect(() => {
    const getProjects = async () => {
      const entries = await fetchEntries("images");
      setProjects(entries);
    };
    const getFavicon = async () => {
      const entries = await fetchEntries("landingPage");
      if (entries[0]?.fields?.favicon?.fields?.file?.url) {
        setFavicon(`https:${entries[0].fields.favicon.fields.file.url}`);
      }
    };
    getProjects();
    getFavicon();
  }, []);

  return (
    <>
      <style jsx global>{`
        html {
          --font-space_mono: ${spaceMono.style.fontFamily};
        }
      `}</style>
      {favicon && (
        <Head>
          <link rel="icon" href={favicon} type="image/png" />
        </Head>
      )}
      <AnimatePresence mode="wait">
        {!isIndexPage && <Header />}
        <motion.main
          key={router.route}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`${isIndexPage ? "" : "py-6 px-12 mt-10"}`}
        >
          <Component {...pageProps} projects={projects} />
        </motion.main>
      </AnimatePresence>
    </>
  );
}
