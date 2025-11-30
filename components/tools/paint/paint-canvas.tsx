"use client";

import { useRef, useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { CanvasHeader } from "./canvas-header";
import { CanvasToolBar } from "./canvas-toolbar";
import { CanvasPalette } from "./canvas-palette";

const paintColors = [
  "#000000",
  "#808080",
  "#800000",
  "#808000",
  "#008000",
  "#008080",
  "#000080",
  "#800080",
  "#808040",
  "#004040",
  "#0080FF",
  "#004080",
  "#8000FF",
  "#804000",
  "#FFFFFF",
  "#C0C0C0",
  "#FF0000",
  "#FFFF00",
  "#00FF00",
  "#00FFFF",
  "#0000FF",
  "#FF00FF",
  "#FFFF80",
  "#00FF80",
  "#80FFFF",
  "#8080FF",
  "#FF0080",
  "#FF8040",
];

export default function PaintCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");
  const [windowState, setWindowState] = useState<"normal" | "minimized">(
    "normal"
  );
  const [showNewCanvasButton, setShowNewCanvasButton] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (canvas && container) {
      const context = canvas.getContext("2d");
      const rect = container.getBoundingClientRect();
      const scale = window.devicePixelRatio;
      canvas.width = rect.width * scale;
      canvas.height = rect.height * scale;
      context?.scale(scale, scale);
      if (context) {
        context.fillStyle = "#FFFFFF";
        context.fillRect(0, 0, canvas.width, canvas.height);
      }
    }
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        context.beginPath();
        context.moveTo(x, y);
        setIsDrawing(true);
      }
    }
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (canvas) {
      const context = canvas.getContext("2d");
      if (context) {
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        requestAnimationFrame(() => {
          context.lineTo(x, y);
          context.strokeStyle = tool === "eraser" ? "#FFFFFF" : color;
          context.lineWidth = tool === "eraser" ? 20 : 2;
          context.lineCap = "round";
          context.stroke();
        });
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const minimizeWindow = () => {
    setWindowState((prevState) =>
      prevState === "minimized" ? "normal" : "minimized"
    );
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.visibility =
        windowState === "minimized" ? "hidden" : "visible";
    }
  }, [windowState]);

  useEffect(() => {
    const container = containerRef.current;
    let handleMaximize: () => void;
    if (windowState === "minimized" && container) {
      handleMaximize = () => {
        setWindowState("normal");
      };
      document.addEventListener("click", handleMaximize);
    }
    return () => {
      if (handleMaximize) {
        document.removeEventListener("click", handleMaximize);
      }
    };
  }, [windowState]);

  const clearCanvas = () => {
    if (window.confirm("Are you sure you want to start new?")) {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          context.fillStyle = "#FFFFFF";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  };

  const closeWindow = () => {
    if (window.confirm("Are you sure you want to close?")) {
      if (containerRef.current) {
        containerRef.current.style.visibility = "hidden";
        setShowNewCanvasButton(true);
      }
    }
  };

  const newCanvas = () => {
    if (containerRef.current) {
      containerRef.current.style.visibility = "visible";
      setShowNewCanvasButton(false);
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext("2d");
        if (context) {
          context.fillStyle = "#FFFFFF";
          context.fillRect(0, 0, canvas.width, canvas.height);
        }
      }
    }
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      const message =
        "Your drawing will be lost. Are you sure you want to leave?";
      return message;
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  return (
    <>
      {showNewCanvasButton && (
        <Button
          className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform'
          onClick={newCanvas}
        >
          New Canvas
        </Button>
      )}
      <div
        ref={containerRef}
        className='absolute top-1/2 left-1/2 w-[380px] -translate-x-1/2 -translate-y-1/2 transform rounded-sm border border-border bg-card sm:w-[630px] sm:shadow-lg md:w-[740px]'
      >
        <CanvasHeader
          onMinimize={minimizeWindow}
          onClose={closeWindow}
          onNew={clearCanvas}
        />
        <div className='flex'>
          <CanvasToolBar selectedTool={tool} onToolSelect={setTool} />
          <div className='h-[460px] w-[370px] overflow-auto border border-border sm:w-[620px] md:w-[730px]'>
            <canvas
              ref={canvasRef}
              width={740}
              height={470}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </div>
        </div>
        <CanvasPalette
          colors={paintColors}
          selectedColor={color}
          onColorSelect={setColor}
        />
        <div className='rounded-b-sm border-t border-border bg-card p-1.5 text-sm'>
          For help, hit that help buton above!
        </div>
      </div>
    </>
  );
}
