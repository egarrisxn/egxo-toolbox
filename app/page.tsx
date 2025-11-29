import Link from "next/link";
import BackButton from "@/components/back-button";
import ThemeSelector from "@/components/theme-toggle";

export default function HomePage() {
  return (
    <>
      <nav className='flex items-center justify-between p-4'>
        <BackButton />
        <h1 className='font-bold sm:text-2xl'>EGXO TOOLBOX</h1>
        <ThemeSelector />
      </nav>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 p-4'>
        <Link href='/buttons'>Buttons</Link>
        <Link href='/focus'>Focus</Link>
        <Link href='/paint'>Paint</Link>
        <Link href='/synth'>Synth</Link>
        <Link href='/typing'>Typing</Link>
      </section>
    </>
  );
}
