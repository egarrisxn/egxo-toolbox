"use client";

import { useRef } from "react";
import { useTypingGame } from "@/hooks/use-typing-game";
import { useLeaderboard } from "@/hooks/use-leaderboard";
import { Button } from "@/components/ui/button";
import { TypingArea } from "./typing-area";
import { GameStats } from "./game-stats";
import { Leaderboard } from "./leaderboard";

interface TypingGameProps {
  quotes: string[];
}

export default function TypingGame({ quotes }: TypingGameProps) {
  const {
    currentQuote,
    userInput,
    wpm,
    liveWpm,
    accuracy,
    isFinished,
    isStarted,
    currentPosition,
    handleUserInput,
    resetGame,
  } = useTypingGame({ quotes });

  const {
    leaderboard,
    submitted,
    addEntryToLeaderboard,
    resetSubmissionStatus,
    refreshLeaderboard,
    clearLeaderboard,
  } = useLeaderboard();

  const textContainerRef = useRef<HTMLDivElement | null>(null);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (
      ["Shift", "Control", "Alt", "Meta", "Tab", "CapsLock", "Escape"].includes(
        e.key
      )
    )
      return;
    if (e.key !== "Backspace") e.preventDefault();
    handleUserInput(e.key);
  };

  const handleGameReset = () => {
    resetGame();
    resetSubmissionStatus();
    refreshLeaderboard();
  };

  if (isFinished) {
    return (
      <Leaderboard
        wpm={wpm}
        accuracy={accuracy}
        leaderboard={leaderboard}
        submitted={submitted}
        onSubmitScore={(name) => addEntryToLeaderboard({ name, wpm, accuracy })}
        onResetGame={handleGameReset}
        onClearLeaderboard={clearLeaderboard}
      />
    );
  }

  return (
    <div className='flex w-full flex-col items-center gap-3 px-4 py-8'>
      <TypingArea
        currentQuote={currentQuote}
        userInput={userInput}
        currentPosition={currentPosition}
        isStarted={isStarted}
        onKeyDown={handleKeyDown}
        textContainerRef={textContainerRef}
      />
      <GameStats
        liveWpm={liveWpm}
        isStarted={isStarted}
        isFinished={isFinished}
      />
      <Button
        onClick={handleGameReset}
        className='mt-2 text-xs tracking-wider uppercase'
      >
        Reset
      </Button>
    </div>
  );
}
