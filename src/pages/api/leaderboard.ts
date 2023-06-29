// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const level = req.query.level;

  let formattedLevel = undefined;
  if (typeof level === "string" && !isNaN(parseInt(level))) {
    formattedLevel = parseInt(level);
  }

  const leaderboard = await prisma.leaderBoardEntry.findMany({
    where: {
      level: formattedLevel,
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
