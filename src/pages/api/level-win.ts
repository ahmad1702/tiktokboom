import prisma from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST")
    return res.status(403).send(`Method '${req.method}' not allowed.`);
  const { level, seconds, profileId } = req.body;

  if (typeof profileId !== "string")
    return res
      .status(401)
      .send(`Pass a valid 'profileId' value, got: ${profileId}`);
  if (typeof level !== "number" || isNaN(level))
    return res.status(401).send(`Pass a valid 'level' value, got: ${level}`);
  if (typeof seconds !== "number" || isNaN(seconds))
    return res
      .status(401)
      .send(`Pass a valid 'seconds' value, got: ${seconds}`);

  let profile = await prisma.profile.findFirst({
    where: {
      id: profileId,
    },
  });
  if (!profile) return res.status(401).send("Profile not found for user");

  if (level > profile.maxLevel) {
    profile = await prisma.profile.update({
      data: {
        maxLevel: profile.maxLevel + 1,
      },
      where: {
        id: profile.id,
      },
    });
  }

  const newLeaderBoardEntry = await prisma.leaderBoardEntry.create({
    data: {
      seconds,
      level,
      profileId: profile.id,
    },
  });
  console.log(JSON.stringify(newLeaderBoardEntry));
  // Load any data your application needs for the API route
  return res.status(200).json(newLeaderBoardEntry);
}
