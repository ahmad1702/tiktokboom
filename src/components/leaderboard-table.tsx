import { LeaderBoardWithProfile } from "@/pages/leaderboard";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

type LeaderBoardTableProps = {
  leaderboards: LeaderBoardWithProfile[];
};

const LeaderBoardTable = ({ leaderboards }: LeaderBoardTableProps) => {
  return (
    <Table>
      <TableCaption>
        The leaderboard rankings of all players on{" "}
        <span className="italic">TikTokBoom</span>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Rank</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>GameMode</TableHead>
          <TableHead>Time (Seconds)</TableHead>
          <TableHead>Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {leaderboards.map((row, i) => (
          <TableRow key={i}>
            <TableCell>{i + 1}</TableCell>
            <TableCell>{row.profile.name}</TableCell>
            <TableCell>{row.level}</TableCell>
            <TableCell>{row.seconds + "s"}</TableCell>
            <TableCell>{row.createdAt.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default LeaderBoardTable;
