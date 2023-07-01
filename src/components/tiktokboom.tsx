import EmojiExplosion from "@/assets/animations/emoji-explosion.json";
import { Button } from "@/components/ui/button";
import { useInterval } from "@/hooks/useInterval";
import { cn } from "@/lib/utils";
import { differenceInMilliseconds } from "date-fns";
import { Check, Clock, PauseIcon, Play } from "lucide-react";
import { Fragment, useState } from "react";
import Lottie from "react-lottie";
import MainLogo from "./main-logo";

// const nums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16] as const;
function getRandomArbitrary(min: number, max: number) {
  return 4;
  return Math.floor(Math.random() * (max - min) + min);
}

const baseActionButtonClassName = "px-8";

type TikTokBoomProps = {
  level: number;
  onLevelWin: (seconds: number) => void;
};

export default function TikTokBoom({ level, onLevelWin }: TikTokBoomProps) {
  const [currentTime, setCurrentTime] = useState<Date>();
  const [startTime, setStartTime] = useState<Date>();
  const [endTime, setEndTime] = useState<Date>();
  const [gameState, setGameState] = useState<
    "idle" | "playing" | "lost" | "won"
  >("won");
  const [luckyNum, setLuckyNum] = useState<number>();
  const [selectedNums, setSelectedNums] = useState<number[]>([]);
  const selectedNumsSet = new Set(selectedNums);

  const size = Math.pow(level, 2);

  const nums: number[] = [];
  for (let i = 1; i <= size; i++) nums.push(i);

  const onStart = () => {
    setLuckyNum(getRandomArbitrary(1, 17));
    setGameState("playing");
    setSelectedNums([]);
    setStartTime(new Date());
    setEndTime(undefined);
  };
  const onFinish = () => {
    setLuckyNum(undefined);
    setSelectedNums([]);
    setStartTime(undefined);
    setEndTime(undefined);
    setGameState("idle");
    setCurrentTime(undefined);
  };

  const win = () => {
    setEndTime(new Date());
    setGameState("won");
    if (!startTime) return;
    onLevelWin(
      Math.abs(differenceInMilliseconds(startTime, new Date()) / 1000)
    );
  };

  const lose = () => {
    setEndTime(new Date());
    setGameState("lost");
  };

  const stop = () => {
    onFinish();
  };

  const getFormattedSecondDiff = (time1: Date, time2: Date, short = false) => {
    const num = Math.abs(differenceInMilliseconds(time1, time2) / 1000);
    const roundedValue = Math.round((num + Number.EPSILON) * 100) / 100;
    return roundedValue.toFixed(2) + (short ? "s" : " seconds");
  };

  useInterval(() => {
    if (gameState !== "playing") return;
    setCurrentTime(new Date());
  }, 100);

  return (
    <div className="flex h-full flex-col items-center justify-center space-y-4">
      <div className="flex items-center gap-2">
        <div className="text-2xl font-bold">Level: {level}</div>
      </div>
      <div
        className={cn(
          "rounded-xl bg-blue-300/40 px-5 py-2 text-xl font-bold text-blue-600 dark:text-blue-300",
          gameState !== "playing" && "pointer-events-none select-none opacity-0"
        )}
      >
        <Clock className="mr-2 inline-block h-6 w-6" />
        {gameState === "playing"
          ? startTime && getFormattedSecondDiff(startTime, new Date())
          : "time"}
      </div>
      <div className="relative flex flex-col space-y-1">
        {gameState === "won" && startTime && endTime && (
          <div className="absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center space-y-4 rounded-xl bg-gradient-to-tr from-green-500 to-green-400 text-lg font-bold text-white">
            You Won in {getFormattedSecondDiff(startTime, endTime)}...
          </div>
        )}
        {gameState === "lost" && startTime && endTime && (
          <>
            <div className="absolute left-3 top-3 z-[999999] bg-red-100 rounded-xl text-sm">
              <MainLogo className="text-sm p-1" />
            </div>
            <div className="pointer-events-none absolute left-0 top-0 z-10 flex h-full w-full flex-col items-center justify-center rounded-xl bg-gradient-to-tr from-red-500 to-red-400 text-lg font-bold text-white">
              <Lottie
                options={{
                  animationData: EmojiExplosion,
                  autoplay: true,
                  loop: true,
                }}
              />
              <div className="-translate-y-8">
                You lost after {getFormattedSecondDiff(startTime, endTime)}...
              </div>
            </div>
          </>
        )}
        <div
          className="grid gap-1"
          style={{
            gridTemplateColumns: `repeat(${Math.floor(
              Math.sqrt(size)
            )}, minmax(0, 1fr))`,
          }}
        >
          {nums.map((val, j) => {
            const key = j;
            const baseBtnClassName = "p-0 w-20 h-20 text-xl";
            const isSelected = selectedNumsSet.has(val);
            if (isSelected) {
              return (
                <Button
                  key={key}
                  size="lg"
                  className={cn(
                    baseBtnClassName,
                    "bg-green-500 hover:bg-green-500 focus:bg-green-500 active:scale-100 active:bg-green-500",
                    "cursor-default bg-opacity-100 opacity-100"
                  )}
                >
                  <Check />
                </Button>
              );
            }

            const onSpotClick = () => {
              if (luckyNum === val) {
                lose();
                return;
              }
              if (selectedNums.length + 3 > nums.length) {
                win();
                return;
              }
              setSelectedNums([...selectedNums, val]);
            };
            return (
              <Fragment key={key}>
                <Button
                  onClick={onSpotClick}
                  size="lg"
                  className={cn(
                    baseBtnClassName,
                    "bg-gradient-to-tr from-blue-500 to-blue-400 text-white hover:from-blue-400 hover:to-blue-300"
                  )}
                  disabled={luckyNum === undefined}
                  style={{
                    opacity: luckyNum === undefined ? 0.2 : 1,
                  }}
                >
                  {val}
                </Button>
              </Fragment>
            );
          })}
        </div>
      </div>
      {(gameState === "lost" ||
        gameState === "won" ||
        gameState === "idle") && (
        <Button
          className={cn(
            baseActionButtonClassName,
            "group bg-gradient-to-tr from-blue-500 to-blue-300 font-semibold text-white hover:from-blue-600 hover:to-blue-400"
          )}
          onClick={onStart}
        >
          <Play className="mr-1 h-4 w-4 origin-center duration-500 group-hover:rotate-[360deg]" />
          Start
        </Button>
      )}
      {gameState === "playing" && (
        <Button
          className={cn(
            baseActionButtonClassName,
            "group bg-red-500 font-semibold text-white hover:bg-red-700"
          )}
          onClick={stop}
        >
          <PauseIcon className="mr-1 h-4 w-4 origin-center duration-500 group-hover:rotate-[360deg]" />
          Stop
        </Button>
      )}
    </div>
  );
}
