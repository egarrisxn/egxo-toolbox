import TypingTest from "@/components/tools/typing/typing-test";
import { typingQuotes } from "@/lib/helpers/typing-helpers";

export default function TypingTestPage() {
  return (
    <section className='mx-auto w-full px-4'>
      <div className='flex flex-col items-center py-16 justify-center'>
        <TypingTest quotes={typingQuotes} />
      </div>
    </section>
  );
}
