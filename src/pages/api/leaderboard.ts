// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/server/db";
import { Profile } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const level = req.query.level;
  const email = req.query.player;

  let formattedLevel = undefined;
  if (typeof level === "string" && !isNaN(parseInt(level))) {
    formattedLevel = parseInt(level);
  }

  let foundProfile: Profile | undefined = undefined;
  if (typeof email === "string") {
    const profile = await prisma.profile.findFirst({
      where: {
        email,
      },
    });
    foundProfile = profile || undefined;
  }

  const leaderboard = await prisma.leaderBoardEntry.findMany({
    where: {
      level: formattedLevel,
      profileId: foundProfile ? foundProfile.id : undefined,
    },
    include: {
      profile: true,
    },
    orderBy: {
      seconds: "asc",
    },
  });
  res.status(200).json(leaderboard);
}
