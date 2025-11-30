import TypingTest from "@/components/tools/typing/typing-test";
import { typingQuotes } from "@/lib/helpers/typing-helpers";

export default function TypingTestPage() {
  return (
    <>
      <section className='flex h-screen w-full items-center justify-center px-4'>
        <TypingTest quotes={typingQuotes} />
      </section>
    </>
  );
}
