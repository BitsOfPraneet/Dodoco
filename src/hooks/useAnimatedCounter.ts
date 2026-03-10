import { useState, useEffect, useCallback, useRef } from 'react';

export function useAnimatedCounter(target: number, duration = 1500, variance = 0, interval = 0) {
  const [value, setValue] = useState(0);
  const prevTargetRef = useRef(0);
  const animFrameRef = useRef<number>();

  const animateTo = useCallback((from: number, to: number) => {
    const start = performance.now();
    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (progress < 1) {
        animFrameRef.current = requestAnimationFrame(animate);
      }
    };
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    animFrameRef.current = requestAnimationFrame(animate);
  }, [duration]);

  // React to target changes — animate from previous value to new target
  useEffect(() => {
    if (target !== prevTargetRef.current) {
      const from = prevTargetRef.current;
      prevTargetRef.current = target;
      animateTo(from, target);
    }
    return () => { if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current); };
  }, [target, animateTo]);

  // Optional jitter for live feel
  useEffect(() => {
    if (variance > 0 && interval > 0) {
      const timer = setInterval(() => {
        const change = Math.round((Math.random() - 0.5) * 2 * variance);
        const newTarget = Math.max(0, target + change);
        animateTo(prevTargetRef.current, newTarget);
        prevTargetRef.current = newTarget;
      }, interval);
      return () => clearInterval(timer);
    }
  }, [variance, interval, target, animateTo]);

  return value;
}
