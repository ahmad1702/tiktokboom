// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import prisma from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const maxLevel = (
    await prisma.leaderBoardEntry.aggregate({
      _max: {
        level: true,
      },
    })
  )._max.level;
  res.status(200).json({ maxLevel });
}
