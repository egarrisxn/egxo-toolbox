import PaintCanvas from "@/components/paint/paint-canvas";

export default function PaintPage() {
  return (
    <>
      <section className='relative h-[calc(100vh-18rem)] w-full'>
        <PaintCanvas />
      </section>
    </>
  );
}
