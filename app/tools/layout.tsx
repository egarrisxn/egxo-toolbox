import { ThemeToggle } from "@/components/shared/theme-toggle";
import { BackButton } from "@/components/shared/back-button";

export default function PagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='absolute top-4 left-4 z-50'>
        <BackButton />
      </div>
      <div className='absolute top-4 right-4 z-50'>
        <ThemeToggle />
      </div>
      <main className='min-h-dvh'>{children}</main>
    </>
  );
}
