// // Next.js API route support: https://nextjs.org/docs/api-routes/introduction
// import prisma from "@/server/db";
// import type { NextApiRequest, NextApiResponse } from "next";

// type Data = {
//   name: string;
// };

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const gameModes = await prisma.gameMode.findMany({
//     orderBy: {
//       numSquares: "asc",
//     },
//   });
//   res.status(200).json(gameModes);
// }
