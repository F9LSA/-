import React, { ReactNode, useEffect, useRef } from 'react';

interface MagnetProps {
  children: ReactNode;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  className?: string;
}

export default function Magnet({
  children,
  padding = 150,
  strength = 3,
  activeTransition = 'transform 0.3s ease-out',
  inactiveTransition = 'transform 0.6s ease-in-out',
  className,
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const target = useRef({ x: 0, y: 0 });
  const current = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number | null>(null);

  useEffect(() => {
    const animate = () => {
      const el = ref.current;
      if (!el) return;

      current.current.x += (target.current.x - current.current.x) * 0.12;
      current.current.y += (target.current.y - current.current.y) * 0.12;
      el.style.transform = `translate3d(${current.current.x}px, ${current.current.y}px, 0)`;

      const distance = Math.abs(target.current.x - current.current.x) + Math.abs(target.current.y - current.current.y);
      if (distance > 0.1) {
        animationFrame.current = requestAnimationFrame(animate);
      } else {
        current.current = target.current;
        el.style.transform = `translate3d(${target.current.x}px, ${target.current.y}px, 0)`;
        animationFrame.current = null;
      }
    };

    const startAnimation = () => {
      if (animationFrame.current === null) {
        animationFrame.current = requestAnimationFrame(animate);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distX = e.clientX - centerX;
      const distY = e.clientY - centerY;

      const withinX = e.clientX > rect.left - padding && e.clientX < rect.right + padding;
      const withinY = e.clientY > rect.top - padding && e.clientY < rect.bottom + padding;

      if (withinX && withinY) {
        target.current = { x: distX / strength, y: distY / strength };
      } else {
        target.current = { x: 0, y: 0 };
      }
      startAnimation();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current !== null) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [padding, strength]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        transform: 'translate3d(0, 0, 0)',
        transition: 'none',
        willChange: 'transform',
      }}
    >
      {children}
    </div>
  );
}