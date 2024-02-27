import HomeIcon from "@/assets/HomeIcon";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <main className="relative w-full h-screen flex flex-col gap-6 items-center justify-center">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-indigo-500 to-pink-500 bg-clip-text text-transparent drop-shadow-md">
        Notes App
      </h1>
      <p>By Ilham Maulana Pratama</p>
      <section className="flex gap-4">
        <Button asChild>
          <Link to="/login">Log in</Link>
        </Button>
        <Button variant="outline" asChild>
          <Link to="/sign-up">Sign Up</Link>
        </Button>
      </section>
      <HomeIcon className="w-[360px] md:w-[400px] h-auto drop-shadow-xl" />
      <div className="absolute w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-spin duration-1000 -z-50"></div>
    </main>
  );
};

export default Home;
