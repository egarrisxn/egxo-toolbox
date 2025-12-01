import QRCodeGenerator from "@/components/tools/qr/qr-generator";

export default function QRGeneratorPage() {
  return (
    <section className='mx-auto w-full px-4'>
      <div className='flex items-center py-16 justify-center'>
        <QRCodeGenerator />
      </div>
    </section>
  );
}
