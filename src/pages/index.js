import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";
import { fetchEntries } from "../../lib/contentful";

const inter = Inter({ subsets: ["latin"] });

export async function getStaticProps() {
  const entries = await fetchEntries("landingPage");
  const landingPage = entries[0];
  return {
    props: {
      landingPage: landingPage.fields,
    },
  };
}

export default function Home({ landingPage }) {
  const { title, backgroundImage, backgroundMediaLink } = landingPage;

  return (
    <main className="relative h-screen w-full">
      <Image
        src={`https:${backgroundImage.fields.file.url}`}
        fill
        objectFit="cover"
        quality={100}
        alt="Fallback Image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <Link
          className="text-white hover:scale-150 duration-300 text-sm"
          href={"/work"}
        >
          {title.toLowerCase()}
        </Link>
      </div>
    </main>
  );
}
