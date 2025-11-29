import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <main>
        <section className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 p-4'>
          <Link href='/buttons'>Buttons</Link>
          <Link href='/pomodoro'>Pomodoro</Link>
          <Link href='/paint'>Paint</Link>
          <Link href='/synth'>Synth</Link>
          <Link href='/typing'>Typing</Link>
        </section>
      </main>
    </>
  );
}
