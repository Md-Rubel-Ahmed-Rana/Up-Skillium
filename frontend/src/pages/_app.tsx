import store from "@/app/store";
import "@/styles/globals.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { type ReactElement, type ReactNode } from "react";
import { Toaster } from "react-hot-toast";
import "react-quill/dist/quill.snow.css";
import { Provider } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export type NextPageWithLayout<P = object, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

export type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const roboto = Roboto({
  weight: ["400", "900"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <main className={roboto.className}>
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
        <Toaster />
      </Provider>
    </main>
  );
}
