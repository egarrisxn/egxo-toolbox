import Link from "next/link";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function HomePage() {
  return (
    <>
      <div className='absolute top-4 left-4'>
        <h1 className='font-black'>EGXO TOOLBOX</h1>
      </div>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <main className='min-h-dvh'>
        <section className='mx-auto flex w-full flex-col gap-2 px-4 py-16'>
          <Link href='/tools/button-copy'>Vanilla CSS Button Copy</Link>
          <Link href='/tools/paint-canvas'>HTML Canvas API Paint</Link>
          <Link href='/tools/palette-generator'>
            Tailwind CSS Color Palettes
          </Link>
          <Link href='/tools/pomodoro-timer'>Pomodoro Timer & Task List</Link>
          <Link href='/tools/qr-generator'>QR Code React Generator</Link>
          <Link href='/tools/synth-player'>Tone Synthesizer Player</Link>
          <Link href='/tools/transcribe-live'>Web Speech API Transcribe</Link>
          <Link href='/tools/typing-test'>Speed & Accuracy Type Test</Link>
        </section>
      </main>
    </>
  );
}
