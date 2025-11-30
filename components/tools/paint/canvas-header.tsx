"use client";

import { Button } from "@/components/ui/button";

interface CanvasHeaderProps {
  onMinimize: () => void;
  onClose: () => void;
  onNew: () => void;
  onMouseDown: React.MouseEventHandler<HTMLDivElement>;
  onMouseMove: React.MouseEventHandler<HTMLDivElement>;
  onMouseUp: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave: React.MouseEventHandler<HTMLDivElement>;
}

export function CanvasHeader({
  onMinimize,
  onClose,
  onNew,
  onMouseDown,
  onMouseMove,
  onMouseUp,
  onMouseLeave,
}: CanvasHeaderProps) {
  return (
    <>
      <div
        className='flex cursor-move items-center justify-between rounded-t bg-blue-900 px-2 py-1 text-white'
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        <p className='text-white'>Mississippi Paint</p>
        <div className='flex gap-1'>
          <Button
            variant='ghost'
            className='size-5 min-w-0 cursor-pointer p-0 text-white hover:bg-blue-600'
            onClick={onMinimize}
          >
            -
          </Button>
          <Button
            variant='ghost'
            className='size-5 min-w-0 cursor-pointer p-0 text-white hover:bg-blue-600'
            onClick={onClose}
          >
            ×
          </Button>
        </div>
      </div>
      <div className='bg-gray-300 p-1 text-sm'>
        <span
          className='mr-1 cursor-pointer rounded px-1.5 py-0.5 text-slate-800 hover:bg-gray-400/20 hover:text-black'
          onClick={onNew}
        >
          New
        </span>
        <a
          href='https://github.com/egarrisxn/mississippi-paint'
          target='_blank'
          rel='noopener noreferrer'
          className='cursor-pointer rounded px-1.5 py-0.5 text-slate-800 hover:bg-gray-400/20 hover:text-black'
        >
          Help
        </a>
      </div>
    </>
  );
}
