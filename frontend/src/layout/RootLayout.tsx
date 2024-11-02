import Footer from "@/components/shared/Footer";
import Navbar from "@/components/shared/Navbar";
import { Typography } from "antd/lib";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const RootLayout = ({ children }: Props) => {
  return (
    <Suspense
      fallback={
        <div className="grid h-screen  place-items-center">
          <Typography.Title>Loading</Typography.Title>
        </div>
      }
    >
      <div className="bg-[#f0f8ff]">
        <Navbar />
        <main className="max-w-[1400px] mx-auto">{children}</main>
        <Footer />
      </div>
    </Suspense>
  );
};

export default RootLayout;