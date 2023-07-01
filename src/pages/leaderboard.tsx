import LeaderBoardTable from "@/components/leaderboard-table";
import Navbar from "@/components/navbar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useProfile } from "@/hooks/useProfile";
import { LeaderBoardEntry, Profile } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { Loader2Icon } from "lucide-react";
import Head from "next/head";
import { useMemo, useState } from "react";
import redaxios from "redaxios";

export type LeaderBoardWithProfile = LeaderBoardEntry & {
  profile: Profile;
};

export default function Leaderboard() {
  const [onlyMine, setOnlyMine] = useState(false);
  const [level, setLevel] = useState<number>();
  const [maxLevel, setMaxLevel] = useState<number>();
  const profile = useProfile();

  useQuery<{ maxLevel: number | null }>({
    queryKey: ["maxlevel"],
    queryFn: async (ctx) => {
      const res = await redaxios.get("/api/maxlevel");
      return res.data;
    },
    onSuccess: (data) => {
      if (data.maxLevel === null) return;
      setMaxLevel(data.maxLevel);
      setLevel(4);
    },
  });

  const leaderboardsQuery = useQuery<LeaderBoardWithProfile[]>({
    queryKey: ["leaderboard", level, onlyMine],
    enabled: maxLevel !== undefined,
    queryFn: async (ctx) => {
      let url = "/api/leaderboard";
      if (level !== undefined || (onlyMine && profile)) {
        url += "?";
      }
      if (level !== undefined) {
        url += `level=${level}`;
      }
      if (onlyMine && profile) {
        url += `player=${profile.id}`;
      }
      const res = await redaxios.get(url);
      if (res.status === 200) {
        return res.data as LeaderBoardWithProfile[];
      }
      return [];
    },
  });
  const { data: leaderboards = [] } = leaderboardsQuery;

  console.log("leaderboard:", leaderboards);

  const levelSelectChange = (value: string) => {
    setLevel(value === "All" ? undefined : parseInt(value));
  };

  const levelArr = useMemo(() => {
    if (maxLevel === undefined || maxLevel < 1) return undefined;
    const arr = [];
    for (let i = 1; i <= maxLevel; i++) {
      arr.push(i);
    }
    return arr;
  }, [maxLevel]);

  return (
    <>
      <Head>
        <title>TikTokBoom | Leaderboard</title>
        <meta
          name="description"
          content="TikTokBoom Leaderboard. A game originating from a tiktok filter."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex h-screen flex-col bg-background text-foreground">
        <Navbar />
        <div className="flex-1 overflow-auto p-10">
          <div className="container max-w-7xl">
            <div className="mb-5 flex items-center justify-between">
              <div className="text-5xl font-bold">Leaderboards</div>
              <div className="flex gap-2">
                {!profile && (
                  <div className="flex items-center gap-2 p-2 rounded border">
                    <div className="text-sm">Only Mine</div>
                    <Switch
                      checked={onlyMine}
                      onCheckedChange={(checked) => setOnlyMine(checked)}
                    />
                  </div>
                )}
                {!!levelArr ? (
                  <Select
                    value={level === undefined ? "All" : level.toString()}
                    onValueChange={levelSelectChange}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a fruit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel className="border-b">Level</SelectLabel>
                        <SelectItem value="All">All</SelectItem>
                        {levelArr.map((levelNum) => {
                          return (
                            <SelectItem
                              key={levelNum}
                              value={levelNum.toString()}
                            >
                              {levelNum + "x" + levelNum}
                            </SelectItem>
                          );
                        })}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                ) : (
                  <Loader2Icon className="h-6 w-6 animate-spin" />
                )}
              </div>
            </div>
            {!leaderboardsQuery.isLoading ? (
              <LeaderBoardTable
                leaderboards={Array.isArray(leaderboards) ? leaderboards : []}
              />
            ) : (
              <div className="flex h-40 w-full items-center justify-center rounded-xl border">
                <Loader2Icon className="h-10 w-10 origin-center animate-spin" />
              </div>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
