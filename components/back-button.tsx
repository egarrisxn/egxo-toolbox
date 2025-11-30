"use client";

import * as React from "react";
import Link from "next/link";
import { motion, type Variants, type SVGMotionProps } from "motion/react";

const hoverVariants: Variants = {
  initial: {
    x: 0,
    transition: { ease: "easeInOut", duration: 0.3 },
  },
  animate: {
    x: "-25%",
    transition: { ease: "easeInOut", duration: 0.3 },
  },
};

type ArrowLeftProps = Omit<
  React.SVGProps<SVGSVGElement>,
  "onAnimationStart" | "onAnimationEnd" | "onTransitionEnd" | "initial"
> &
  SVGMotionProps<SVGSVGElement> & {
    size?: number;
  };

function ArrowLeft({ size = 24, ...props }: ArrowLeftProps) {
  return (
    <div className='inline-flex items-center justify-center overflow-hidden'>
      <motion.svg
        width={size}
        height={size}
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth={2}
        strokeLinecap='round'
        strokeLinejoin='round'
        xmlns='http://www.w3.org/2000/svg'
        className='size-5 md:size-6'
        initial='initial'
        whileHover='animate'
        {...props}
      >
        <motion.g variants={hoverVariants}>
          <path d='M19 12H5' />
          <path d='m12 19-7-7 7-7' />
        </motion.g>
      </motion.svg>
    </div>
  );
}

export function BackButton() {
  return (
    <Link href='/'>
      <button
        type='button'
        aria-label='Go Back'
        className='cursor-pointer text-foreground select-none'
      >
        <ArrowLeft />
      </button>
    </Link>
  );
}
