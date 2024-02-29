import { ReactNode } from "react";

const Navbar = ({ children }: { children?: ReactNode }) => {
  return (
    <nav className="sticky top-0 bg-background py-4 px-10 flex justify-between border-b z-40">
      {children}
    </nav>
  );
};

export default Navbar;
