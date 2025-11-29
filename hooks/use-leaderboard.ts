import { useState, useCallback } from "react";

import { LeaderboardEntry } from "@/lib/typing/types";

const STORAGE_KEY = "typing-leaderboard";

function getLeaderboardFromStorage(): LeaderboardEntry[] {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    console.error("Failed to parse leaderboard from localStorage.");
    return [];
  }
}

function saveLeaderboardToStorage(entries: LeaderboardEntry[]) {
  if (typeof window === "undefined") return;

  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch (error) {
    console.error("Failed to save leaderboard to localStorage:", error);
  }
}

export function useLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(() =>
    getLeaderboardFromStorage()
  );
  const [submitted, setSubmitted] = useState(false);

  const addEntryToLeaderboard = useCallback(
    (newEntry: Omit<LeaderboardEntry, "timestamp">) => {
      const entry: LeaderboardEntry = {
        ...newEntry,
        timestamp: Date.now(),
      };

      const updated = [entry, ...getLeaderboardFromStorage()]
        .sort(
          (a, b) =>
            b.wpm - a.wpm ||
            b.accuracy - a.accuracy ||
            b.timestamp - a.timestamp
        )
        .slice(0, 10);

      saveLeaderboardToStorage(updated);
      setLeaderboard(updated);
      setSubmitted(true);
    },
    []
  );

  const clearLeaderboard = useCallback(() => {
    if (typeof window === "undefined") return;

    window.localStorage.removeItem(STORAGE_KEY);
    setLeaderboard([]);
  }, []);

  const resetSubmissionStatus = useCallback(() => {
    setSubmitted(false);
  }, []);

  const refreshLeaderboard = useCallback(() => {
    setLeaderboard(getLeaderboardFromStorage());
  }, []);

  return {
    leaderboard,
    submitted,
    addEntryToLeaderboard,
    resetSubmissionStatus,
    refreshLeaderboard,
    clearLeaderboard,
  };
}
