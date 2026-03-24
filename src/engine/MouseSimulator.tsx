import { motion } from "framer-motion";

/**
 * Absolute-positioned fake mouse cursor with smooth bezier movement.
 * Controlled entirely by the sequence controller.
 */

interface MouseSimulatorProps {
  /** Target X position (% of viewport width) */
  x: number;
  /** Target Y position (% of viewport height) */
  y: number;
  visible: boolean;
  clicking: boolean;
}

export default function MouseSimulator({ x, y, visible, clicking }: MouseSimulatorProps) {
  return (
    <motion.div
      className="fixed pointer-events-none"
      style={{ zIndex: 9999 }}
      initial={{ opacity: 0, left: "30%", top: "60%" }}
      animate={{
        opacity: visible ? 1 : 0,
        left: `${x}%`,
        top: `${y}%`,
      }}
      transition={{
        left: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
        top: { type: "spring", stiffness: 60, damping: 20, mass: 1 },
        opacity: { duration: 0.3 },
      }}
    >
      {/* Cursor SVG */}
      <svg width="20" height="24" viewBox="0 0 20 24" fill="none" className="drop-shadow-md">
        <path
          d="M1 1L17 12.5L9.5 13.5L6.5 21L1 1Z"
          fill="white"
          stroke="#191c1d"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>

      {/* Click ripple */}
      {clicking && (
        <motion.div
          className="absolute -top-2 -left-2 w-10 h-10 rounded-full border-2 border-primary/40"
          initial={{ scale: 0.3, opacity: 1 }}
          animate={{ scale: 1.8, opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      )}
    </motion.div>
  );
}
