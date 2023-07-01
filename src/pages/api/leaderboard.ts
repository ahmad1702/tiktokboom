// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/server/db";
import { Profile } from "@prisma/client";
import { set } from "lodash-es";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const level = req.query.level;
  const profileId = req.query.player;

  let foundProfile: Profile | undefined = undefined;
  if (typeof profileId === "string") {
    const profile = await prisma.profile.findFirst({
      where: {
        id: profileId,
      },
    });
    foundProfile = profile || undefined;
  }

  const where = {};

  if (typeof level === "string") {
    if (!isNaN(parseInt(level))) {
      set(where, "level", parseInt(level));
    }
  }
  if (foundProfile) {
    set(where, "profile", foundProfile);
  }

  const leaderboard = await prisma.leaderBoardEntry.findMany({
    where,
    include: {
      profile: true,
    },
    orderBy: {
      seconds: "asc",
    },
  });
  res.status(200).json(leaderboard);
}
