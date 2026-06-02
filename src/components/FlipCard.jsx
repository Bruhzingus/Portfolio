import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import "./FlipCard.css";

/**
 * Accessible flip card.
 * - One interactive control (role="button") drives the whole card, so it works
 *   with mouse, touch, keyboard (Enter/Space) and screen readers — there is no
 *   separate "show specs" path. (A real <button> can't legally wrap the spec
 *   list, so we use the role + keydown pattern instead.)
 * - Front shows the build image (or a placeholder); back shows the specs.
 * - Respects prefers-reduced-motion: the flip becomes an instant cross-fade.
 */
function FlipCard({ image, alt, label, children }) {
  const [flipped, setFlipped] = useState(false);
  const reduceMotion = useReducedMotion();

  const toggle = () => setFlipped((f) => !f);
  const onKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggle();
    }
  };

  return (
    <div
      className="flip-card"
      role="button"
      tabIndex={0}
      onClick={toggle}
      onKeyDown={onKeyDown}
      aria-expanded={flipped}
      aria-label={
        flipped
          ? `Hide specifications for ${label}`
          : `Show specifications for ${label}`
      }
    >
      <motion.div
        className="flip-inner"
        initial={false}
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={
          reduceMotion
            ? { duration: 0 }
            : { duration: 0.6, ease: [0.4, 0, 0.2, 1] }
        }
      >
        <div className="flip-face flip-front" aria-hidden={flipped}>
          {image ? (
            <img src={image} alt={alt} />
          ) : (
            <div className="pc-pic-placeholder">Build photo coming soon</div>
          )}
          <span className="flip-hint" aria-hidden="true">Click to see specs</span>
        </div>
        <div className="flip-face flip-back" aria-hidden={!flipped}>
          {children}
        </div>
      </motion.div>
    </div>
  );
}

export default FlipCard;
