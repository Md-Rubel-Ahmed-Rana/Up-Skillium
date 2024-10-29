import store from "@/app/store";
import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Navbar />
      <Component {...pageProps} />;
      <Footer />
      <Toaster />
    </Provider>
  );
}
