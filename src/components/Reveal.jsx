import { motion, useReducedMotion } from "framer-motion";

/**
 * Scroll-triggered entrance animation (fade + slide). Reused across sections for
 * a consistent feel. Respects prefers-reduced-motion (renders in place, no slide).
 *
 * direction: "up" | "left" | "right"
 */
const offsets = {
  up: { x: 0, y: 24 },
  left: { x: -40, y: 0 },
  right: { x: 40, y: 0 },
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  as = "div",
  ...rest
}) {
  const reduceMotion = useReducedMotion();
  const off = offsets[direction] ?? offsets.up;
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, x: reduceMotion ? 0 : off.x, y: reduceMotion ? 0 : off.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, delay, ease: [0.4, 0, 0.2, 1] }}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}
