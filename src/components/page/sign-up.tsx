import { SignUp } from "@clerk/clerk-react";

const SignUpPage = () => (
  <div className="relative w-full h-screen flex flex-col items-center justify-center">
    <SignUp path="/sign-up" signInUrl="/login" afterSignUpUrl="/dashboard" />
    <div className="absolute w-[18rem] h-[18rem] md:w-[28rem] md:h-[28rem] bg-gradient-to-r from-indigo-500 to-pink-500 rounded-full blur-3xl opacity-30 animate-spin duration-1000 -z-50"></div>
  </div>
);

export default SignUpPage;
