import Link from "next/link";
import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="relative h-screen w-full">
      <Image
        src="/images/background/backgammon_background.jpg"
        fill
        objectFit="cover"
        quality={100}
        alt="Fallback Image"
        className="absolute top-0 left-0 w-full h-full object-cover"
      />

      <div className="relative z-10 flex items-center justify-center h-full">
        <Link className="text-white text-5xl" href={"/work"}>
          yoav hainebach
        </Link>
      </div>
    </main>
  );
}
