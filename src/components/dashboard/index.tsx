import Sidebar from "@/components/ui/sidebar";
import { ReactNode } from "react";

const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full flex">
      <Sidebar />
      {children}
    </main>
  );
};

export default Dashboard;
