import { ThemeToggle } from "@/components/theme-toggle";
import { BackButton } from "@/components/back-button";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='absolute top-4 left-4'>
        <BackButton />
      </div>
      <div className='absolute top-4 right-4'>
        <ThemeToggle />
      </div>
      <main>{children}</main>
    </>
  );
}
