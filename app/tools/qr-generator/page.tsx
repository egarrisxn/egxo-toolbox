import QRCodeGenerator from "@/components/tools/qr/qr-generator";

export default function QRGeneratorPage() {
  return (
    <section className='grid min-h-screen place-items-center'>
      <div className='px-4'>
        <QRCodeGenerator />
      </div>
    </section>
  );
}
