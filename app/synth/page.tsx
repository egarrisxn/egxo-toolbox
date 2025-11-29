import BackButton from "@/components/back-button";
import ThemeSelector from "@/components/theme-toggle";
import SynthPlayer from "@/components/synth/synth-player";

export default function SynthPage() {
  return (
    <>
      <nav className='flex items-center justify-between p-4'>
        <BackButton />
        <h1 className='font-bold sm:text-2xl'>A SYNTH VIZ</h1>
        <ThemeSelector />
      </nav>
      <section className='mx-auto flex w-full items-center justify-center p-4'>
        <SynthPlayer />
      </section>
    </>
  );
}
