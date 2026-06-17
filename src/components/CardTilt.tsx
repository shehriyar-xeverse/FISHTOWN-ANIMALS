/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface CardTiltProps {
  children: React.ReactNode;
  className?: string;
  config?: { max: number; perspective: number };
}

export default function CardTilt({ children, className = '', config = { max: 8, perspective: 800 } }: CardTiltProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isTouch, setIsTouch] = useState(false);

  // Motion coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs to avoid jerky motion
  const springConfig = { damping: 25, stiffness: 180, mass: 0.5 };
  const rotateX = useSpring(y, springConfig);
  const rotateY = useSpring(x, springConfig);

  // Track if mouse is pointing or user is on touch device
  useEffect(() => {
    const handleTouchStart = () => {
      setIsTouch(true);
    };
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
    };
  }, []);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (isTouch || !cardRef.current) return;

    const el = cardRef.current;
    const rect = el.getBoundingClientRect();

    // Absolute mouse positions relative to element center
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left - width / 2;
    const mouseY = event.clientY - rect.top - height / 2;

    // Normalised tilt (-1 to 1) multiplied by maximum tilt degrees
    const rY = (mouseX / (width / 2)) * config.max;
    const rX = -(mouseY / (height / 2)) * config.max; 

    x.set(rY);
    y.set(rX);
  };

  const handleMouseEnter = () => {
    if (isTouch) return;
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative cursor-pointer transition-shadow rounded-2xl ${
        isHovered && !isTouch ? 'shadow-xl' : 'shadow-md'
      } ${className}`}
      style={{
        perspective: config.perspective,
      }}
    >
      <motion.div
        style={{
          rotateX: isHovered && !isTouch ? rotateX : 0,
          rotateY: isHovered && !isTouch ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          scale: isHovered && !isTouch ? 1.015 : 1,
        }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="w-full h-full rounded-2xl"
      >
        <div style={{ transform: 'translateZ(20px)', transformStyle: 'preserve-3d' }} className="w-full h-full rounded-2xl">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
