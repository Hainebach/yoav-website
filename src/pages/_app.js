import Header from "@/component/Header";
import "@/styles/globals.css";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }) {
  const router = useRouter();
  return (
    <>
      {router.pathname !== "/" && <Header />}
      <Component {...pageProps} />
    </>
  );
}
