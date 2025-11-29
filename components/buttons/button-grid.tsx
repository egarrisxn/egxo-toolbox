"use client";

import { toast } from "sonner";
import { buttonGroups } from "@/lib/buttons/variants";
import ButtonGroup from "./button-group";

export default function ButtonGrid() {
  const copyButtonCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);

      toast.success("CSS copied to clipboard!", {
        description: "The button style code is ready to paste.",
        duration: 3000,
      });
    } catch (err) {
      toast.error("Failed to copy code.", {
        description:
          "Clipboard access denied. Please try again or copy manually.",
      });
      console.error("Failed to copy:", err);
    }
  };

  return (
    <>
      {buttonGroups.map((group, index) => (
        <ButtonGroup
          key={group.name || index}
          group={group}
          onCopy={copyButtonCode}
        />
      ))}
    </>
  );
}
