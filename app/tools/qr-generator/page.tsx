import QRCodeGenerator from "@/components/tools/qr/qr-generator";

export default function QRGeneratorPage() {
  return (
    <>
      <section className='grid min-h-screen place-items-center px-4'>
        <QRCodeGenerator />
      </section>
    </>
  );
}
