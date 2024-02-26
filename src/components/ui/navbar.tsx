import { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Navbar = ({ children }: { children?: ReactNode }) => {
  const navigate = useNavigate();
  return (
    <nav className="py-4 px-10 flex justify-between border-b">
      <Button onClick={() => navigate(-1)} size="sm" className="gap-2">
        <ChevronLeftIcon size={20} /> Back
      </Button>
      {children}
    </nav>
  );
};

export default Navbar;
