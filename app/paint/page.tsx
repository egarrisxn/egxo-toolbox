import BackButton from "@/components/back-button";
import ThemeSelector from "@/components/theme-toggle";
import Canvas from "@/components/paint/canvas";

export default function PaintPage() {
  return (
    <>
      <nav className='flex items-center justify-between p-4'>
        <BackButton />
        <h1 className='text-2xl font-bold'>MISSISSIPPI PAINT</h1>
        <ThemeSelector />
      </nav>
      <section className='relative h-[calc(100vh-18rem)] w-full'>
        <Canvas />
      </section>
    </>
  );
}
