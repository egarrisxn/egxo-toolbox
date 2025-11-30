import { motion } from "motion/react";
import { Slider } from "@/components/ui/slider";

interface HueSliderProps {
  hueShift: number;
  setHueShift: (value: number) => void;
}

export function HueSlider({ hueShift, setHueShift }: HueSliderProps) {
  return (
    <motion.div
      className='space-y-2'
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className='flex justify-between'>
        <label className='text-sm font-medium'>Hue Shift</label>
        <motion.span
          className='text-sm text-gray-500'
          animate={{
            x: hueShift === 0 ? [0, 5, -5, 5, -5, 0] : 0,
            transition: { duration: hueShift === 0 ? 0.5 : 0 },
          }}
        >
          {hueShift}°
        </motion.span>
      </div>
      <Slider
        value={[hueShift]}
        min={-180}
        max={180}
        step={1}
        onValueChange={(value) => setHueShift(value[0])}
        className='transition-all duration-150 ease-out'
      />
    </motion.div>
  );
}

interface VibrancySliderProps {
  vibrancy: number;
  setVibrancy: (value: number) => void;
}

export function VibrancySlider({ vibrancy, setVibrancy }: VibrancySliderProps) {
  return (
    <motion.div
      className='space-y-2'
      whileHover={{ scale: 1.01 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
    >
      <div className='flex justify-between'>
        <label className='text-sm font-medium'>Vibrancy</label>
        <motion.span
          className='text-sm text-gray-500'
          animate={{
            x: vibrancy === 50 ? [0, 5, -5, 5, -5, 0] : 0,
            transition: { duration: vibrancy === 50 ? 0.5 : 0 },
          }}
        >
          {vibrancy}%
        </motion.span>
      </div>
      <Slider
        value={[vibrancy]}
        min={0}
        max={100}
        step={1}
        onValueChange={(value) => setVibrancy(value[0])}
        className='transition-all duration-150 ease-out'
      />
    </motion.div>
  );
}
