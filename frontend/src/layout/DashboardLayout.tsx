import DashboardSidebar from "@/components/dashboard/sidebars/DashboardSidebar";
import React, { ReactNode } from "react";

type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5">
      <div>
        <DashboardSidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
