"use client";

import { Button } from "@/components/ui/button";

interface ColorPaletteProps {
  colors: string[];
  selectedColor: string;
  onColorSelect: (color: string) => void;
}

export function ColorPalette({
  colors,
  selectedColor,
  onColorSelect,
}: ColorPaletteProps) {
  return (
    <div className='flex border-t border-gray-400 bg-gray-300 p-1'>
      <div className='flex flex-wrap gap-1'>
        {colors.map((c) => (
          <Button
            key={c}
            variant='ghost'
            className={`size-6 min-w-0 cursor-pointer p-0 ${
              selectedColor === c ? "ring-1 ring-gray-600" : ""
            }`}
            style={{ backgroundColor: c }}
            onClick={() => onColorSelect(c)}
          />
        ))}
      </div>
    </div>
  );
}
