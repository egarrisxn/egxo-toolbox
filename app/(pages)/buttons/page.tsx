import "./buttons.css";
import ButtonGrid from "@/components/buttons/button-grid";

export default function ButtonsPage() {
  return (
    <>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 p-4 sm:grid-cols-2 lg:grid-cols-3'>
        <ButtonGrid />
      </section>
    </>
  );
}
