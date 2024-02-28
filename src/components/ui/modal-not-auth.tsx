import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useSession } from "@clerk/clerk-react";

const NotAuthModal = () => {
  const { isSignedIn, isLoaded } = useSession();

  return (
    <>
      {isLoaded && !isSignedIn && (
        <div className="absolute w-full h-screen bg-background/75 backdrop-blur-sm flex flex-col items-center justify-center">
          <Card className="w-[350px]">
            <CardHeader>
              <CardTitle>Oops!, Your not Log in</CardTitle>
            </CardHeader>
            <CardFooter className="flex flex-col gap-6">
              <p>Looks like you didn't log in, let's do it now...</p>
              <Button asChild>
                <Link className="w-full" to="/login">
                  Log in
                </Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </>
  );
};

export default NotAuthModal;
