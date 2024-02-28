import { ReactNode } from "react";

type Props = { children: ReactNode };

const Layout = ({ children }: Props) => {
  return (
    <div className="w-full h-screen flex flex-col gap-8 overflow-y-auto">
      {children}
    </div>
  );
};

export default Layout;
