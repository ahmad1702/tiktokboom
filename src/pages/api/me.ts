import prisma from "@/server/db";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, name } = req.body;
  if (typeof email !== "string" || typeof name !== "string") {
    return res.status(401).send("Invalid payload");
  }

  let profile = await prisma.profile.findFirst({
    where: {
      email,
    },
  });
  if (!profile) {
    profile = await prisma.profile.create({
      data: {
        name,
        email,
        maxLevel: 1,
      },
    });
  }
  if (!profile) return res.status(500).send("Profile could not be found/made.");
  return res.status(200).json(profile);
}
