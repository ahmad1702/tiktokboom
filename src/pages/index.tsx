import Navbar from "@/components/navbar";
import TikTokBoom from "@/components/tiktokboom";
import { useProfile } from "@/hooks/useProfile";
import { useClerk } from "@clerk/nextjs";
import { LeaderBoardEntry, Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import { Inter } from "next/font/google";
import { useState } from "react";
import redaxios from "redaxios";

const inter = Inter({ subsets: ["latin"] });

type LeaderBoardWithProfile = LeaderBoardEntry & { profile: Profile };

export default function Home() {
  const profile = useProfile();
  const clerk = useClerk();
  const [maxLevel, setMaxLevel] = useState<number>();
  const [level, setLevel] = useState<number>();

  const levelQuery = useQuery<number>({
    queryKey: ["my-level", clerk.loaded, profile?.id],
    queryFn: async (ctx) => {
      if (!profile?.email) {
        console.log("No Profile Found. Setting the level to 1...");
        return 1;
      }
      const res = (await redaxios.get(
        `/api/mylevel?email=${profile.email}`
      )) as {
        data: { level: number };
      };
      console.error(res);
      return res.data.level || 1;
    },
    onSuccess(data) {
      setMaxLevel(data);
      setLevel(data);
    },
  });

  const { refetch } = levelQuery;

  const onLevelWin = async (seconds: number) => {
    setLevel((prev) => prev! + 1);
    const profileId = profile?.id;
    if (!profileId) return;
    try {
      const res = await redaxios.post("/api/level-win", {
        profileId,
        level,
        seconds,
      });
      if (res.status === 200) {
        const leaderBoardEntry = res.data as LeaderBoardEntry;
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-64px)] flex flex-col items-center justify-center gap-2">
        {!clerk.loaded && <Loader2Icon className="w-10 h-10 animate-spin" />}
        {clerk.loaded && level !== undefined && (
          <TikTokBoom
            onLevelWin={onLevelWin}
            level={level}
            setLevel={setLevel}
            maxLevel={level}
            setMaxLevel={setLevel}
          />
        )}
      </main>
    </>
  );
}
