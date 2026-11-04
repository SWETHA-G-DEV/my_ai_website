import React, { useEffect, useRef } from 'react';

interface SakuraCanvasProps {
  intensity?: 'calm' | 'romantic' | 'celebration';
  className?: string;
}

export const SakuraCanvas: React.FC<SakuraCanvasProps> = ({
  intensity = 'romantic',
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const count = intensity === 'celebration' ? 70 : intensity === 'romantic' ? 40 : 25;

    interface Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      rotation: number;
      rotationSpeed: number;
      opacity: number;
      color: string;
      type: 'petal' | 'heart' | 'sparkle';
    }

    const petalsColors = [
      'rgba(255, 182, 193, ',
      'rgba(255, 192, 203, ',
      'rgba(254, 215, 226, ',
      'rgba(244, 114, 182, ',
    ];

    const particles: Particle[] = Array.from({ length: count }, () => {
      const typeRand = Math.random();
      const type: 'petal' | 'heart' | 'sparkle' =
        typeRand < 0.65 ? 'petal' : typeRand < 0.85 ? 'heart' : 'sparkle';
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        size: type === 'sparkle' ? 2 + Math.random() * 3 : 8 + Math.random() * 10,
        speedX: -0.8 + Math.random() * 1.6,
        speedY: 0.6 + Math.random() * 1.8,
        rotation: Math.random() * Math.PI * 2,
        rotationSpeed: -0.02 + Math.random() * 0.04,
        opacity: 0.4 + Math.random() * 0.5,
        color: petalsColors[Math.floor(Math.random() * petalsColors.length)],
        type,
      };
    });

    const drawPetal = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `${p.color}${p.opacity})`;
      ctx.beginPath();
      // Anime curved petal shape
      ctx.moveTo(0, 0);
      ctx.bezierCurveTo(p.size / 2, -p.size, p.size, -p.size / 2, 0, p.size);
      ctx.bezierCurveTo(-p.size, -p.size / 2, -p.size / 2, -p.size, 0, 0);
      ctx.fill();
      ctx.restore();
    };

    const drawHeart = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rotation);
      ctx.fillStyle = `rgba(244, 63, 94, ${p.opacity * 0.85})`;
      ctx.beginPath();
      const s = p.size * 0.5;
      ctx.moveTo(0, s * 0.3);
      ctx.bezierCurveTo(-s * 0.5, -s * 0.5, -s, s * 0.2, 0, s);
      ctx.bezierCurveTo(s, s * 0.2, s * 0.5, -s * 0.5, 0, s * 0.3);
      ctx.fill();
      ctx.restore();
    };

    const drawSparkle = (p: Particle) => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.fillStyle = `rgba(255, 245, 180, ${p.opacity})`;
      ctx.beginPath();
      ctx.arc(0, 0, p.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    };

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.speedX;
        p.y += p.speedY;
        p.rotation += p.rotationSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x < -30) p.x = width + 20;
        if (p.x > width + 30) p.x = -20;

        if (p.type === 'petal') drawPetal(p);
        else if (p.type === 'heart') drawHeart(p);
        else drawSparkle(p);
      }

      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none fixed inset-0 z-10 w-full h-full ${className}`}
    />
  );
};
