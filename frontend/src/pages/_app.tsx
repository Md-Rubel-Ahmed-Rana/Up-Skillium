import store from "@/app/store";
import "@/styles/globals.css";
import Lenis from "@studio-freight/lenis";
import "animate.css";
import AOS from "aos";
import "aos/dist/aos.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { useEffect, type ReactElement, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: false,
    });
  }, []);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);
  });

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </Provider>
  );
}
