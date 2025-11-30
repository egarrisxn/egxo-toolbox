import PaletteGenerator from "@/components/tools/palette/palette-generator";

export default function PaletteGeneratorPage() {
  return (
    <>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 px-4 py-16'>
        <PaletteGenerator />
      </section>
    </>
  );
}
