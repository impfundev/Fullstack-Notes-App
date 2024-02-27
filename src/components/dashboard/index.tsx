import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";

const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full flex">
      <Sidebar />
      {children}
      <Toaster />
    </main>
  );
};

export default Dashboard;
