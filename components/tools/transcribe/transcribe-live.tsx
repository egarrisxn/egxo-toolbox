"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import LanguageSettings from "./language-settings";

interface IconProps {
  className?: string;
}

const MicIcon = ({ className }: IconProps) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path d='M12 19v3' />
    <path d='M19 10v2a7 7 0 0 1-14 0v-2' />
    <rect x='9' y='2' width='6' height='13' rx='3' />
  </svg>
);

const MicOffIcon = ({ className }: IconProps) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path d='M12 19v3' />
    <path d='M15 9.34V5a3 3 0 0 0-5.68-1.33' />
    <path d='M16.95 16.95A7 7 0 0 1 5 12v-2' />
    <path d='M18.89 13.23A7 7 0 0 0 19 12v-2' />
    <path d='m2 2 20 20' />
    <path d='M9 9v3a3 3 0 0 0 5.12 2.12' />
  </svg>
);

const SettingsIcon = ({ className }: IconProps) => (
  <svg
    width={24}
    height={24}
    viewBox='0 0 24 24'
    fill='none'
    stroke='currentColor'
    strokeWidth={2}
    strokeLinecap='round'
    strokeLinejoin='round'
    xmlns='http://www.w3.org/2000/svg'
    className={className}
  >
    <path d='M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915' />
    <circle cx='12' cy='12' r='3' />
  </svg>
);

interface Transcript {
  id: string;
  text: string;
  timestamp: number;
  isFinal: boolean;
}

export default function TranscribeLive() {
  const [isListening, setIsListening] = useState(false);
  const [transcripts, setTranscripts] = useState<Transcript[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState("");
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([
    "en-US",
    "hi-IN",
  ]);
  const [error, setError] = useState<string | null>(null);

  const recognitionRef = useRef<any>(null);
  const transcriptContainerRef = useRef<HTMLDivElement>(null);
  const isListeningRef = useRef(false); // tracks desired listening state

  // Keep ref in sync with state
  useEffect(() => {
    isListeningRef.current = isListening;
  }, [isListening]);

  // Initialize SpeechRecognition once on mount
  useEffect(() => {
    if (typeof window === "undefined") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      const isIOS =
        /iPad|iPhone|iPod/.test(navigator.userAgent) ||
        (navigator.platform === "MacIntel" &&
          (navigator as any).maxTouchPoints > 1);

      // Wrap setError in a setTimeout to make it asynchronous.
      // This schedules the state update for the next event loop, avoiding the
      // synchronous cascade warning, while keeping the functionality the same.
      setTimeout(() => {
        setError(
          isIOS
            ? "Speech recognition isn't available in iOS browsers yet. Try this app on a desktop browser (Chrome or Edge) for live transcription."
            : "Speech recognition is not supported in this browser. Please try Chrome or Edge on desktop."
        );
      }, 0);

      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = selectedLanguages[0] || "en-US"; // Use the primary selected language

    recognition.onresult = (event: any) => {
      let interimTranscript = "";
      let finalTranscript = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;

        if (event.results[i].isFinal) {
          finalTranscript += transcript + " ";
        } else {
          interimTranscript += transcript;
        }
      }

      if (finalTranscript) {
        const newTranscript: Transcript = {
          id: Date.now().toString(),
          text: finalTranscript.trim(),
          timestamp: Date.now(),
          isFinal: true,
        };
        setTranscripts((prev) => [...prev, newTranscript]);
        setCurrentTranscript("");
      } else {
        setCurrentTranscript(interimTranscript);
      }
    };

    recognition.onerror = (event: any) => {
      console.error("Speech recognition error:", event.error);

      // Ignore benign / expected errors
      if (event.error === "no-speech" || event.error === "aborted") {
        return;
      }

      setError(`Error: ${event.error}`);
      setIsListening(false);
      isListeningRef.current = false;
    };

    recognition.onend = () => {
      // Auto-restart if we *want* to be listening
      if (isListeningRef.current) {
        try {
          recognition.start();
        } catch (e) {
          console.error("Error restarting recognition:", e);
        }
      }
    };

    recognitionRef.current = recognition;

    return () => {
      try {
        recognition.stop();
      } catch {
        // ignore
      }
      recognitionRef.current = null;
    };
  }, [selectedLanguages]); // Added selectedLanguages to re-initiate recognition on language change

  // Update language when selection changes (Kept for clarity, but logic moved to main effect)
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.lang = selectedLanguages[0] || "en-US";
    }
  }, [selectedLanguages]);

  // Auto-scroll transcripts
  useEffect(() => {
    if (transcriptContainerRef.current) {
      transcriptContainerRef.current.scrollTop =
        transcriptContainerRef.current.scrollHeight;
    }
  }, [transcripts, currentTranscript]);

  const toggleListening = () => {
    if (!recognitionRef.current) {
      setError("Speech recognition not initialized");
      return;
    }

    if (isListening) {
      // STOP LISTENING, but keep existing text
      try {
        recognitionRef.current.stop();
      } catch (e) {
        console.error("Error stopping recognition:", e);
      }
      isListeningRef.current = false;
      setIsListening(false);
    } else {
      // START LISTENING; do NOT clear history here
      setError(null);
      // optional: clear only the interim line so it doesn't look stale
      setCurrentTranscript("");

      try {
        recognitionRef.current.start();
        isListeningRef.current = true;
        setIsListening(true);
      } catch (e) {
        console.error("Error starting recognition:", e);
        setError("Unable to start speech recognition. Please try again.");
        isListeningRef.current = false;
        setIsListening(false);
      }
    }
  };

  const clearTranscripts = () => {
    // Only this actually wipes the text
    setTranscripts([]);
    setCurrentTranscript("");
  };

  return (
    <>
      {/* Header */}
      <header>
        <div className='container mx-auto flex items-center justify-end p-4'>
          <div className='flex flex-row items-center gap-1'>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className='cursor-pointer text-foreground select-none'
            >
              <div className='inline-flex items-center justify-center overflow-hidden'>
                <SettingsIcon />
              </div>
            </button>
          </div>
        </div>
      </header>

      {/* Settings Panel */}
      {showSettings && (
        <LanguageSettings
          selectedLanguages={selectedLanguages}
          onLanguagesChange={setSelectedLanguages}
          onClose={() => setShowSettings(false)}
        />
      )}

      {/* Main Content */}
      <main className='flex flex-1 flex-col overflow-hidden'>
        {/* Transcription Display */}
        <div
          ref={transcriptContainerRef}
          className='flex-1 space-y-4 overflow-y-auto px-4 py-6'
        >
          {transcripts.length === 0 && !currentTranscript && !isListening && (
            <div className='flex h-full items-center justify-center'>
              <div className='space-y-2 text-center'>
                <div className='text-lg text-muted-foreground'>
                  Tap the microphone to start
                </div>
                <div className='text-sm text-muted-foreground'>
                  Speak in English, Hindi, or mix both languages..
                </div>
              </div>
            </div>
          )}

          {transcripts.map((transcript) => (
            <Card key={transcript.id} className='border-border bg-card p-4'>
              <p className='text-lg leading-relaxed text-balance text-card-foreground'>
                {transcript.text}
              </p>
            </Card>
          ))}

          {currentTranscript && (
            <Card className='border-2 border-accent/30 bg-muted/50 p-4'>
              <p className='text-lg leading-relaxed text-balance text-muted-foreground'>
                {currentTranscript}
              </p>
            </Card>
          )}

          {isListening && !currentTranscript && transcripts.length === 0 && (
            <div className='flex items-center justify-center py-8'>
              <div className='space-y-2 text-center'>
                <div className='flex justify-center'>
                  <div className='animate-pulse'>
                    <MicIcon className='size-8 text-accent' />
                  </div>
                </div>
                <p className='text-muted-foreground'>Listening...</p>
              </div>
            </div>
          )}
        </div>

        {/* Error Display */}
        {error && (
          <div className='border-t border-destructive/20 bg-destructive/10 px-4 py-3'>
            <p className='text-center text-sm text-destructive'>{error}</p>
          </div>
        )}

        {/* Controls */}
        <div className='safe-area-bottom border-t border-border bg-card p-4'>
          <div className='container mx-auto max-w-md space-y-3'>
            <Button
              onClick={toggleListening}
              size='lg'
              className={cn(
                "h-16 w-full text-lg font-medium transition-all",
                isListening
                  ? "text-destructive-foreground bg-destructive hover:bg-destructive/90"
                  : "bg-accent text-accent-foreground hover:bg-accent/90"
              )}
            >
              {isListening ? (
                <>
                  <MicOffIcon className='mr-2 size-6' />
                  Stop Recording
                </>
              ) : (
                <>
                  <MicIcon className='mr-2 size-6' />
                  Start Recording
                </>
              )}
            </Button>

            {transcripts.length > 0 && (
              <Button
                onClick={clearTranscripts}
                variant='outline'
                size='sm'
                className='w-full bg-transparent'
              >
                Clear Transcripts
              </Button>
            )}
          </div>
        </div>
      </main>
    </>
  );
}
