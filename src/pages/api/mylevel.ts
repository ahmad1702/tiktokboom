import prisma from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email } = req.query;
  if (!email || typeof email !== "string")
    return res.status(401).send("No email passed");

  const profile = await prisma.profile.findFirst({
    where: {
      email,
    },
  });

  const maxLevel = profile?.maxLevel;
  if (maxLevel === undefined) return res.status(500).send("No level found");

  // Load any data your application needs for the API route
  return res.status(200).json({ level: maxLevel });
}
