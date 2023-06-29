import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { LeaderBoardEntry, Profile } from "@prisma/client";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

type LeaderBoardWithProfile = LeaderBoardEntry & { profile: Profile };

export default function Home() {
  const [leaderboard, setLeaderboard] = useState<LeaderBoardWithProfile[]>([]);

  const fetchLeaderboard = async () => {
    try {
      const res = await (
        await fetch(`${window.location.origin}/api/leaderboard`)
      ).json();
      if (Array.isArray(res)) {
        setLeaderboard(res);
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar />
      <main className="flex flex-col gap-2">
        <Button onClick={() => fetchLeaderboard()}>Call data</Button>
        <div>{JSON.stringify(leaderboard)}</div>
      </main>
    </>
  );
}
