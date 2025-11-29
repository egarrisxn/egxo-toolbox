"use client";

import { useRef, useState, useEffect } from "react";
import { colors } from "@/lib/paint/colors";
import { Button } from "@/components/ui/button";
import { CanvasHeader } from "./header";
import { ToolBar } from "./toolbar";
import { ColorPalette } from "./palette";

interface Position {
  x: number;
  y: number;
}

export default function Canvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState("#000000");
  const [tool, setTool] = useState("brush");
  const [windowState, setWindowState] = useState<"normal" | "minimized">(
    "normal"
  );
  const [position, setPosition] = useState<Position>({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
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

  const startDragging = (e: React.MouseEvent<HTMLDivElement>) => {
    setDragging(true);
    setPosition({
      x: e.clientX - (containerRef.current?.offsetLeft || 0),
      y: e.clientY - (containerRef.current?.offsetTop || 0),
    });
  };

  const onDrag = (e: React.MouseEvent<HTMLDivElement>) => {
    if (dragging && containerRef.current) {
      const left = e.clientX - position.x;
      const top = e.clientY - position.y;
      containerRef.current.style.left = `${left}px`;
      containerRef.current.style.top = `${top}px`;
    }
  };

  const stopDragging = () => {
    setDragging(false);
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
        className='absolute top-1/2 left-1/2 w-[400px] -translate-x-1/2 -translate-y-1/2 transform rounded-sm border-2 border-white bg-gray-200 shadow-lg lg:w-[800px]'
      >
        <CanvasHeader
          onMinimize={minimizeWindow}
          onClose={closeWindow}
          onNew={clearCanvas}
          onMouseDown={startDragging}
          onMouseMove={onDrag}
          onMouseUp={stopDragging}
          onMouseLeave={stopDragging}
        />
        <div className='flex'>
          <ToolBar selectedTool={tool} onToolSelect={setTool} />
          <div className='h-[450px] w-[380px] overflow-auto border border-gray-400 lg:w-[760px]'>
            <canvas
              ref={canvasRef}
              width={760}
              height={450}
              onMouseDown={startDrawing}
              onMouseMove={draw}
              onMouseUp={stopDrawing}
              onMouseOut={stopDrawing}
            />
          </div>
        </div>
        <ColorPalette
          colors={colors}
          selectedColor={color}
          onColorSelect={setColor}
        />
        <div className='border-t border-gray-400 bg-gray-300 p-1.5 text-sm'>
          For help, utilize the Help Button above.
        </div>
      </div>
    </>
  );
}
