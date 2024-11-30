import store from "@/app/store";
import "@/styles/globals.css";
import "animate.css";
import type { NextPage } from "next";
import type { AppProps } from "next/app";
import { type ReactElement, type ReactNode } from "react";
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

  return (
    <Provider store={store}>
      {getLayout(<Component {...pageProps} />)}
      <Toaster />
    </Provider>
  );
}
