import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

type Props = { className?: string };

const MainLogo = ({ className }: Props) => {
  return (
    <Button variant="ghost" className={cn("text-xl font-bold", className)}>
      <span className="mr-2">💣</span>
      <span className="bg-gradient-to-t from-red-500 via-pink-400 to-cyan-500 bg-clip-text text-transparent">
        TikTok
      </span>
      Boom
    </Button>
  );
};

export default MainLogo;
