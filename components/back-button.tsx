import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackButton() {
  return (
    <Link href='/'>
      <Button size='icon'>
        <ArrowLeft className='size-5' />
      </Button>
    </Link>
  );
}
