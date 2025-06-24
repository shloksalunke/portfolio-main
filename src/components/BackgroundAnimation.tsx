import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  size: number;
  baseSize: number;
  rotation: number;
  vx: number;
  vy: number;
  vr: number;
  color: string;
  trail: { x: number; y: number; size: number; rotation: number }[];
  type: 'circle' | 'square' | 'triangle';
}

const BackgroundAnimation = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;
    contextRef.current = context;

    const props = {
      particleCount: 100,
      baseSize: 3,
      maxSpeed: 2,
      trailLength: 8,
      mouseRadius: 150,
      mouseForce: 0.15,
      connectionRadius: 100,
    };

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      const dpr = window.devicePixelRatio || 1;
      
      canvas.width = innerWidth * dpr;
      canvas.height = innerHeight * dpr;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      
      context.scale(dpr, dpr);
      initParticles();
    };

    const initParticles = () => {
      const shapes = ['circle', 'square', 'triangle'] as const;
      const colors = [
        'rgba(6, 182, 212, 0.7)',
        'rgba(59, 130, 246, 0.7)',
        'rgba(139, 92, 246, 0.7)',
      ];

      particlesRef.current = Array.from({ length: props.particleCount }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: props.baseSize,
        baseSize: props.baseSize,
        rotation: Math.random() * Math.PI * 2,
        vx: (Math.random() - 0.5) * props.maxSpeed,
        vy: (Math.random() - 0.5) * props.maxSpeed,
        vr: (Math.random() - 0.5) * 0.1,
        color: colors[Math.floor(Math.random() * colors.length)],
        trail: [],
        type: shapes[Math.floor(Math.random() * shapes.length)],
      }));
    };

    const drawParticle = (ctx: CanvasRenderingContext2D, particle: Particle) => {
      ctx.save();
      ctx.translate(particle.x, particle.y);
      ctx.rotate(particle.rotation);
      
      if (particle.trail.length > 1) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        
        const gradient = ctx.createLinearGradient(
          particle.trail[0].x - particle.x,
          particle.trail[0].y - particle.y,
          particle.trail[particle.trail.length - 1].x - particle.x,
          particle.trail[particle.trail.length - 1].y - particle.y
        );
        
        gradient.addColorStop(0, particle.color);
        gradient.addColorStop(1, 'transparent');
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = particle.size / 2;
        
        particle.trail.forEach((point) => {
          ctx.lineTo(point.x - particle.x, point.y - particle.y);
        });
        
        ctx.stroke();
      }

      ctx.fillStyle = particle.color;
      
      switch (particle.type) {
        case 'square':
          ctx.fillRect(-particle.size, -particle.size, particle.size * 2, particle.size * 2);
          break;
        case 'triangle':
          ctx.beginPath();
          ctx.moveTo(-particle.size, particle.size);
          ctx.lineTo(particle.size, particle.size);
          ctx.lineTo(0, -particle.size);
          ctx.closePath();
          ctx.fill();
          break;
        default:
          ctx.beginPath();
          ctx.arc(0, 0, particle.size, 0, Math.PI * 2);
          ctx.fill();
      }
      
      ctx.restore();
    };

    const drawConnections = (ctx: CanvasRenderingContext2D) => {
      for (let i = 0; i < particlesRef.current.length; i++) {
        for (let j = i + 1; j < particlesRef.current.length; j++) {
          const p1 = particlesRef.current[i];
          const p2 = particlesRef.current[j];
          const dx = p2.x - p1.x;
          const dy = p2.y - p1.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < props.connectionRadius) {
            const alpha = (1 - distance / props.connectionRadius) * 0.2;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(6, 182, 212, ${alpha})`;
            ctx.lineWidth = 1;
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }
    };

    const updateParticle = (particle: Particle) => {
      particle.trail.unshift({ 
        x: particle.x, 
        y: particle.y, 
        size: particle.size,
        rotation: particle.rotation 
      });
      if (particle.trail.length > props.trailLength) {
        particle.trail.pop();
      }

      particle.x += particle.vx;
      particle.y += particle.vy;
      particle.rotation += particle.vr;

      const dx = mouseRef.current.x - particle.x;
      const dy = mouseRef.current.y - particle.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < props.mouseRadius) {
        const force = (props.mouseRadius - distance) / props.mouseRadius;
        particle.vx -= dx * force * props.mouseForce;
        particle.vy -= dy * force * props.mouseForce;
        particle.size = particle.baseSize * (1 + force);
      } else {
        particle.size = particle.baseSize;
      }

      if (particle.x < 0) particle.x = canvas.width;
      if (particle.x > canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = canvas.height;
      if (particle.y > canvas.height) particle.y = 0;

      particle.vx *= 0.99;
      particle.vy *= 0.99;
    };

    const drawFrame = () => {
      if (!contextRef.current) return;
      
      contextRef.current.clearRect(0, 0, canvas.width, canvas.height);
      
      drawConnections(contextRef.current);
      
      particlesRef.current.forEach(particle => {
        updateParticle(particle);
        drawParticle(contextRef.current!, particle);
      });

      animationFrameRef.current = requestAnimationFrame(drawFrame);
    };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
      };
    };

    const handleResize = () => {
      resizeCanvas();
    };

    resizeCanvas();
    drawFrame();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none"
      style={{ 
        background: 'radial-gradient(circle at center, #000 0%, #111 100%)',
      }}
    />
  );
};

export default BackgroundAnimation; 