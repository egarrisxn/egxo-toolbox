import TypingTest from "@/components/tools/typing/typing-test";
import { typingQuotes } from "@/lib/helpers/typing-helpers";

export default function TypingTestPage() {
  return (
    <section className='grid min-h-screen place-items-center'>
      <TypingTest quotes={typingQuotes} />
    </section>
  );
}
