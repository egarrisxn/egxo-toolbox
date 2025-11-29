import type { CSSProperties } from "react";
import { hexToRgb } from "@/lib/buttons/helpers";
import { getButtonStyles } from "@/lib/buttons/styles";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

import type { Group } from "@/lib/buttons/types";

interface ButtonGroupProps {
  group: Group;
  onCopy: (css: string) => void;
}

export default function ButtonGroup({ group, onCopy }: ButtonGroupProps) {
  const sanitizedGroupName = group.name.toLowerCase().replace(/\s+/g, "");

  const baseButtonClasses =
    "relative px-6 py-3 font-semibold text-base cursor-pointer outline-none border-none transition-all duration-200 select-none w-full md:w-auto";

  return (
    <Card>
      <CardHeader>
        <CardTitle className='mx-auto text-2xl font-bold'>
          {group.name}
        </CardTitle>
      </CardHeader>
      <CardContent className='flex w-full min-w-60 flex-col gap-4'>
        {group.variants.map((variant) => {
          const variantClass = variant.name; // e.g. "default", "rounded", "gradient"
          const groupClass = sanitizedGroupName; // e.g. "nightlife"

          const rgbColor = hexToRgb(variant.color);

          return (
            <button
              key={variant.name}
              className={`${baseButtonClasses} ${groupClass} ${variantClass}`}
              onClick={() => onCopy(getButtonStyles(group.name, variant))}
              aria-label={`Copy ${variant.name} ${group.name} button style`}
              style={
                {
                  "--color": variant.color,
                  "--color-rgb": rgbColor,
                } as CSSProperties
              }
            >
              {variant.name}
            </button>
          );
        })}
      </CardContent>
    </Card>
  );
}
