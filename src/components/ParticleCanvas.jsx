import { useEffect, useRef } from 'react';
import { ParticleSystem } from '../lib/particles';

const ParticleCanvas = ({ enabled }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!enabled) return undefined;

    const canvas = canvasRef.current;
    if (!canvas) return undefined;

    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '1';

    const system = new ParticleSystem(canvas, {
      particleCount: window.innerWidth < 768 ? 40 : 80,
      particleSpeed: 0.3,
      connectionDistance: 120,
      mouseInteraction: true,
    });

    return () => system?.destroy();
  }, [enabled]);

  return <canvas ref={canvasRef} className="particle-canvas" aria-hidden="true" />;
};

export default ParticleCanvas;
