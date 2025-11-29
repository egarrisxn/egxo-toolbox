import TypingGame from "@/components/typing/typing-game";
import { quotes } from "@/lib/typing/quotes";

export default function TypingPage() {
  return (
    <>
      <section className='mx-auto grid w-full max-w-7xl grid-cols-1 place-items-center p-4'>
        <TypingGame quotes={quotes} />
      </section>
    </>
  );
}
