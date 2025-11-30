"use client";

import { useState } from "react";
import { QRCodeSVG } from "qrcode.react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type ErrorCorrectionLevel = "L" | "M" | "Q" | "H";

export default function QRCodeGenerator() {
  const [url, setUrl] = useState("https://egxo.dev");
  const [qrCode, setQRCode] = useState("https://egxo.dev");
  const [color, setColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [size, setSize] = useState(350);
  const [errorCorrection, setErrorCorrection] =
    useState<ErrorCorrectionLevel>("M");

  const generateQRCode = (e: React.FormEvent) => {
    e.preventDefault();
    setQRCode(url);
  };

  return (
    <div className='flex w-full max-w-md flex-col gap-4 bg-card py-6 sm:rounded-xl sm:border sm:border-border sm:shadow-lg'>
      <div className='px-1 sm:px-6'>
        <form onSubmit={generateQRCode} className='space-y-4'>
          <div>
            <Label htmlFor='url'>URL</Label>
            <Input
              id='url'
              type='url'
              placeholder='Enter a URL'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              required
              className='w-full'
            />
          </div>

          <div className='grid grid-cols-3 items-center justify-center gap-4'>
            <div>
              <Label htmlFor='color'>QR Color</Label>
              <Input
                id='color'
                type='color'
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className='h-9.5 w-full'
              />
            </div>
            <div>
              <Label htmlFor='backgroundColor'>BG Color</Label>
              <Input
                id='backgroundColor'
                type='color'
                value={backgroundColor}
                onChange={(e) => setBackgroundColor(e.target.value)}
                className='h-9.5 w-full'
              />
            </div>
            <div>
              <Label htmlFor='errorCorrection'>Error Level</Label>
              <Select
                value={errorCorrection}
                onValueChange={(value) =>
                  setErrorCorrection(value as ErrorCorrectionLevel)
                }
              >
                <SelectTrigger className='w-full' id='errorCorrection'>
                  <SelectValue placeholder='Select error correction level' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='L'>SM (7%)</SelectItem>
                  <SelectItem value='M'>MD (15%)</SelectItem>
                  <SelectItem value='Q'>LG (25%)</SelectItem>
                  <SelectItem value='H'>XL (30%)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label htmlFor='size'>
              Size: {size}x{size}
            </Label>
            <Slider
              id='size'
              min={100}
              max={350}
              step={10}
              value={[size]}
              onValueChange={(value) => setSize(value[0])}
              className='w-full'
            />
          </div>

          <Button type='submit' className='w-full'>
            Generate Your QR
          </Button>
        </form>
      </div>

      <div className='flex items-center justify-center px-0 sm:px-2'>
        {qrCode && (
          <div className='mt-4'>
            <QRCodeSVG
              value={qrCode}
              size={size}
              fgColor={color}
              bgColor={backgroundColor}
              level={errorCorrection}
              marginSize={0}
            />
          </div>
        )}
      </div>
    </div>
  );
}
