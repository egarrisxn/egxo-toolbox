import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <>
      <div className='absolute top-4 left-4'>
        <h1 className='font-black'>TOOLS</h1>
      </div>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <main className='grid h-screen w-full place-items-center'>
        <section className='flex flex-col gap-1'>
          <Link href='/tools/button-copy'>Button Copy</Link>
          <Link href='/tools/paint-canvas'>Paint Canvas</Link>
          <Link href='/tools/pomodoro-timer'>Pomodoro Timer</Link>
          <Link href='/tools/synth-player'>Synth Player</Link>
          <Link href='/tools/transcribe-live'>Transcribe Live</Link>
          <Link href='/tools/typing-test'>Typing Test</Link>
        </section>
      </main>
    </>
  );
}
