"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Trash2,
  Plus,
  Music,
} from "lucide-react";
import { fetchYouTubeVideoTitle } from "@/lib/focus/fetch-title";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";

import type { Track, OnStateChangeEvent, Player } from "@/lib/focus/types";

enum PlayerState {
  UNSTARTED = -1,
  ENDED = 0,
  PLAYING = 1,
  PAUSED = 2,
  BUFFERING = 3,
  CUED = 5,
}

// Helper to load items from localStorage once on initialization
const loadItems = (): Track[] => {
  if (typeof window === "undefined") return [];
  const savedItems = localStorage.getItem("musicPlaylist");
  return savedItems ? JSON.parse(savedItems) : [];
};

const YouTubePlayerComponent = React.memo(
  ({
    onTrackEnd,
    soundEnabled,
    url,
  }: {
    onTrackEnd?: () => void;
    soundEnabled?: boolean;
    url?: string | null;
  }) => {
    const [items, setItems] = useState<Track[]>(loadItems());
    const [currentItemIndex, setCurrentItemIndex] = useState<number>(-1);
    const [isPlaying, setIsPlaying] = useState(false);
    const [newItemUrl, setNewItemUrl] = useState("");
    const [volume, setVolume] = useState(70);

    // Use `any` here because the runtime object is coming from the YT API
    const playerRef = useRef<Player | any | null>(null);
    const playerContainerRef = useRef<HTMLDivElement>(null);

    // Ref for imperative logic, state mirror for render
    const isPlayerReadyRef = useRef(false);
    const [isPlayerReady, setIsPlayerReady] = useState(false);

    const extractVideoId = useCallback((url: string): string | null => {
      const regExp =
        /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
      const match = url.match(regExp);
      return match ? match[1] : null;
    }, []);

    const loadAndPlayItem = useCallback(
      (index: number) => {
        if (!items[index]) return;

        const player = playerRef.current;
        if (!player || !isPlayerReadyRef.current) return;

        const item = items[index];
        const videoId = extractVideoId(item.url);

        if (videoId) {
          if (typeof player.loadVideoById === "function") {
            player.loadVideoById(videoId);
          }
          if (typeof player.setVolume === "function") {
            player.setVolume(soundEnabled ? volume : 0);
          }
        }
      },
      [items, volume, extractVideoId, soundEnabled]
    );

    const playNextItem = useCallback(() => {
      if (items.length === 0) return;
      const newIndex = (currentItemIndex + 1) % items.length;
      setCurrentItemIndex(newIndex);
      loadAndPlayItem(newIndex);
    }, [currentItemIndex, items, loadAndPlayItem]);

    // Save playlist whenever it changes
    useEffect(() => {
      if (typeof window !== "undefined") {
        localStorage.setItem("musicPlaylist", JSON.stringify(items));
      }
    }, [items]);

    // Main YouTube API and Player Initialization Effect
    useEffect(() => {
      function onPlayerReady() {
        isPlayerReadyRef.current = true;
        setIsPlayerReady(true);

        const player = playerRef.current;
        if (!player) return;

        const videoIdFromUrl = url ? extractVideoId(url) : null;
        if (videoIdFromUrl && typeof player.loadVideoById === "function") {
          player.loadVideoById(videoIdFromUrl);
        }

        if (typeof player.setVolume === "function") {
          player.setVolume(soundEnabled ? volume : 0);
        }

        if (items.length > 0 && currentItemIndex === -1) {
          setCurrentItemIndex(0);
        }
      }

      function onPlayerStateChange(event: OnStateChangeEvent) {
        switch (event.data) {
          case PlayerState.ENDED:
            setIsPlaying(false);
            if (onTrackEnd) {
              onTrackEnd();
            } else {
              playNextItem();
            }
            break;
          case PlayerState.PLAYING:
            setIsPlaying(true);
            break;
          case PlayerState.PAUSED:
          case PlayerState.BUFFERING:
          case PlayerState.UNSTARTED:
            setIsPlaying(false);
            break;
          default:
            break;
        }
      }

      function onPlayerError() {
        console.error("YouTube Player Error");
        playNextItem();
      }

      function initializePlayer() {
        if (!playerContainerRef.current) return;

        // Avoid duplicating the inner div if the effect runs more than once
        let playerDiv =
          playerContainerRef.current.querySelector<HTMLDivElement>(
            "#music-player"
          );

        if (!playerDiv) {
          playerDiv = document.createElement("div");
          playerDiv.id = "music-player";
          playerDiv.style.display = "none";
          playerContainerRef.current.appendChild(playerDiv);
        }

        if (window.YT && window.YT.Player && !playerRef.current) {
          playerRef.current = new window.YT.Player("music-player", {
            height: "0",
            width: "0",
            playerVars: {
              playsinline: 1,
              controls: 0,
              disablekb: 1,
            },
            events: {
              onReady: onPlayerReady,
              onStateChange: onPlayerStateChange,
              onError: onPlayerError,
            },
          });
        }
      }

      if (typeof window !== "undefined") {
        if (!window.YT || !window.YT.Player) {
          const tag = document.createElement("script");
          tag.src = "https://www.youtube.com/iframe_api";
          const firstScriptTag = document.getElementsByTagName("script")[0];
          firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag || null);

          window.onYouTubeIframeAPIReady = () => {
            initializePlayer();
          };
        } else {
          initializePlayer();
        }
      }

      return () => {
        const player = playerRef.current;
        if (player && typeof player.destroy === "function") {
          player.destroy();
        }
        playerRef.current = null;
        isPlayerReadyRef.current = false;
        setIsPlayerReady(false);
      };
    }, [
      soundEnabled,
      url,
      playNextItem,
      extractVideoId,
      volume,
      onTrackEnd,
      currentItemIndex,
      items.length,
    ]);

    const YOUTUBE_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY || "";

    const addItem = async () => {
      if (!newItemUrl.trim()) return;
      const videoId = extractVideoId(newItemUrl);
      if (!videoId) {
        alert("Invalid YouTube URL");
        return;
      }
      const title = await fetchYouTubeVideoTitle(videoId, YOUTUBE_KEY);
      const newItem: Track = {
        id: videoId,
        title: title || `(No Title) ${videoId.substring(0, 8)}...`,
        url: newItemUrl,
      };

      const newItems = [...items, newItem];
      setItems(newItems);
      setNewItemUrl("");

      if (items.length === 0) {
        setCurrentItemIndex(0);
      }
    };

    const removeItem = (index: number) => {
      const newItems = [...items];
      newItems.splice(index, 1);
      setItems(newItems);

      const player = playerRef.current;

      if (index === currentItemIndex) {
        if (
          isPlayerReadyRef.current &&
          player &&
          typeof player.stopVideo === "function"
        ) {
          player.stopVideo();
        }
        setIsPlaying(false);

        if (newItems.length > 0) {
          setCurrentItemIndex(
            index >= newItems.length ? newItems.length - 1 : index
          );
        } else {
          setCurrentItemIndex(-1);
        }
      } else if (index < currentItemIndex) {
        setCurrentItemIndex(currentItemIndex - 1);
      }
    };

    const togglePlay = () => {
      if (items.length === 0) return;

      if (currentItemIndex === -1) {
        setCurrentItemIndex(0);
        return;
      }

      const player = playerRef.current;
      if (!player || !isPlayerReadyRef.current) return;

      if (isPlaying) {
        if (typeof player.pauseVideo === "function") {
          player.pauseVideo();
        }
      } else {
        if (typeof player.playVideo === "function") {
          player.playVideo();
        }
      }
    };

    const playPreviousItem = () => {
      if (items.length === 0) return;
      const newIndex =
        currentItemIndex <= 0 ? items.length - 1 : currentItemIndex - 1;
      setCurrentItemIndex(newIndex);
      loadAndPlayItem(newIndex);
    };

    // Auto-load and play when currentItemIndex changes
    useEffect(() => {
      if (
        currentItemIndex >= 0 &&
        items.length > 0 &&
        isPlayerReadyRef.current
      ) {
        loadAndPlayItem(currentItemIndex);
      }
    }, [currentItemIndex, items.length, loadAndPlayItem]);

    // Volume effect — safe against missing setVolume
    useEffect(() => {
      const player = playerRef.current;
      if (
        !player ||
        !isPlayerReadyRef.current ||
        typeof player.setVolume !== "function"
      ) {
        return;
      }

      player.setVolume(soundEnabled ? volume : 0);
    }, [volume, soundEnabled]);

    return (
      <Card className='h-fit w-full max-w-96 min-w-80 rounded-none border-none px-2 pb-0 shadow-none sm:max-w-96 sm:min-w-96 xl:min-w-[26em]'>
        <div ref={playerContainerRef} className='hidden' />

        <CardContent>
          <div className='flex space-x-2'>
            <Input
              value={newItemUrl}
              onChange={(e) => setNewItemUrl(e.target.value)}
              placeholder='Paste YouTube Music URL'
              className='grow'
            />
            <Button onClick={addItem} size='icon'>
              <Plus />
            </Button>
          </div>

          <div className='py-3'>
            <p className='mx-auto flex w-full max-w-68 items-center justify-center truncate text-sm text-primary/80'>
              {currentItemIndex >= 0 && items[currentItemIndex]
                ? items[currentItemIndex].title
                : "No track selected"}
            </p>
          </div>

          <div className='space-y-1'>
            <Slider
              value={[volume]}
              min={0}
              max={100}
              step={1}
              onValueChange={(value) => setVolume(value[0])}
            />
            <p className='text-right text-xs text-primary/50'>Vol: {volume}%</p>
          </div>

          <div className='flex justify-center space-x-3'>
            <Button
              onClick={playPreviousItem}
              size='icon'
              disabled={items.length === 0}
            >
              <SkipBack />
            </Button>

            <Button
              onClick={togglePlay}
              size='icon'
              disabled={items.length === 0 || !isPlayerReady}
            >
              {isPlaying ? <Pause /> : <Play />}
            </Button>

            <Button
              onClick={playNextItem}
              size='icon'
              disabled={items.length === 0}
            >
              <SkipForward />
            </Button>
          </div>

          <div className='max-h-32 space-y-1 overflow-y-auto py-2'>
            {items.length === 0 ? (
              <p className='pt-2 text-center text-sm text-primary/50 italic'>
                No tracks added
              </p>
            ) : (
              items.map((item, index) => (
                <div
                  key={item.id}
                  className={`group flex items-center justify-between rounded p-1.5 ${
                    index === currentItemIndex ? "bg-primary/10" : ""
                  }`}
                >
                  <div
                    className='flex flex-1 cursor-pointer items-center gap-1 text-primary/70 hover:text-primary/90'
                    onClick={() => {
                      setCurrentItemIndex(index);
                    }}
                  >
                    <Music className='size-3 shrink-0' />
                    <p className='w-full max-w-56 truncate text-xs text-primary/80'>
                      {item.title}
                    </p>
                  </div>
                  <Button
                    size='icon'
                    onClick={() => removeItem(index)}
                    className='size-4 p-2.5 text-primary/50 opacity-0 group-hover:opacity-100 hover:bg-transparent hover:text-primary/70'
                  >
                    <Trash2 className='size-2' />
                  </Button>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    );
  }
);

YouTubePlayerComponent.displayName = "YouTubePlayer";

export const YouTubePlayer = YouTubePlayerComponent;
