import "./button-copy.css";
import ButtonCopy from "@/components/tools/button/button-copy";

export default function ButtonCopyPage() {
  return (
    <>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:grid-cols-2 lg:grid-cols-3'>
        <ButtonCopy />
      </section>
    </>
  );
}
