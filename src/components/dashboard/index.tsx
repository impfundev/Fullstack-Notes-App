import Sidebar from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import { ReactNode } from "react";
import NotAuthModal from "@/components/ui/modal-not-auth";

const Dashboard = ({ children }: { children: ReactNode }) => {
  return (
    <main className="w-full flex">
      <Sidebar />
      {children}
      <Toaster />
      <NotAuthModal />
    </main>
  );
};

export default Dashboard;
