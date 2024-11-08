import React, { ReactNode } from "react";
import DashboardSidebar from "@/components/dashboard/sidebars/DashboardSidebar";

type DashboardLayoutProps = {
  children?: ReactNode;
};

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="flex justify-between gap-5">
      <div>
        <DashboardSidebar />
      </div>
      <div className="w-full">{children}</div>
    </div>
  );
};

export default DashboardLayout;
