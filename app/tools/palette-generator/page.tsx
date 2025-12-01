import PaletteGenerator from "@/components/tools/palette/palette-generator";

export default function PaletteGeneratorPage() {
  return (
    <section className='mx-auto w-full max-w-6xl px-4'>
      <div className='py-16'>
        <PaletteGenerator />
      </div>
    </section>
  );
}
