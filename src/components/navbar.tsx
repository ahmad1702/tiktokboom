import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import { TrophyIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

const Navbar = () => {
  return (
    <div className="flex h-[64px] w-full items-center justify-between border-b px-5">
      <div className="flex items-center gap-2">
        <Link href="/">
          <Button variant="ghost" className="text-xl font-bold">
            <span className="mr-2">💣</span>
            <span className="bg-gradient-to-t from-red-500 via-pink-400 to-cyan-500 bg-clip-text text-transparent">
              TikTok
            </span>
            Boom
          </Button>
        </Link>
        <Link href="/leaderboard" className="hidden md:block">
          <Button variant="ghost" className="">
            <TrophyIcon className="mr-2 h-4 w-4" />
            Leaderboards
          </Button>
        </Link>
      </div>
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
    </div>
  );
};

export default Navbar;
