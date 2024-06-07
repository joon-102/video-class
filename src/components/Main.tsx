// App.js
import { useEffect, useRef } from 'react';

function Main() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    wsRef.current = new WebSocket('ws://localhost:8080');

    wsRef.current.onmessage = (event) => {
      const canvas = canvasRef.current;
      if (canvas) {
        const context = canvas.getContext('2d');
        if (context) {
          const imageData = new ImageData(new Uint8ClampedArray(event.data), canvas.width, canvas.height);
          context.putImageData(imageData, 0, 0);
        }
      }
    };

    return () => {
      wsRef.current?.close();
    };

  }, []);

  return <canvas ref={canvasRef} width={1024} height={768} />;
}

export default Main;
