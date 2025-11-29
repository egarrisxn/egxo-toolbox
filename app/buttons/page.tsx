import "./buttons.css";
import ThemeSelector from "@/components/theme-toggle";
import ButtonGrid from "@/components/buttons/button-grid";
import BackButton from "@/components/back-button";

export default function ButtonsPage() {
  return (
    <>
      <nav className='flex items-center justify-between p-4'>
        <BackButton />
        <h1 className='font-bold sm:text-2xl'>EZCOPY BUTTONS</h1>
        <ThemeSelector />
      </nav>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3'>
        <ButtonGrid />
      </section>
    </>
  );
}
