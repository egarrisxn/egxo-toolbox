import { ThemeToggle } from "@/components/theme-toggle";
import { BackButton } from "@/components/back-button";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='absolute top-4 left-4 z-10'>
        <BackButton />
      </div>
      <div className='absolute top-4 right-4 z-10'>
        <ThemeToggle />
      </div>
      <main className='min-h-screen'>{children}</main>
    </>
  );
}
