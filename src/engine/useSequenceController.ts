import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Timeline-driven sequence controller.
 * Each step has a fixed duration. Transitions are deterministic.
 * The entire sequence loops after completion.
 */

export type StepId =
  | "landing"          // Show search screen
  | "typing1"          // Type first query
  | "click1"           // Mouse moves to button, clicks
  | "transition1"      // Search shrinks, OEE panel slides in
  | "show-oee"         // OEE panel fully visible, pause
  | "typing2"          // Type second query in bottom bar
  | "click2"           // Button press
  | "transition2"      // Downtime panel overlays
  | "show-downtime"    // Both panels visible, pause
  | "typing3"          // Type third query
  | "click3"           // Button press
  | "transition3"      // Trace panel overlays
  | "show-trace"       // Three panels visible, pause
  | "typing4"          // Type fourth query
  | "click4"           // Button press
  | "transition-final" // Transition to module grid
  | "show-final";      // Module grid (interactive), stays here

export interface StepConfig {
  id: StepId;
  duration: number; // milliseconds
}

const TIMELINE: StepConfig[] = [
  { id: "landing",          duration: 2000 },
  { id: "typing1",          duration: 2600 },
  { id: "click1",           duration: 1000 },
  { id: "transition1",      duration: 800  },
  { id: "show-oee",         duration: 2500 },
  { id: "typing2",          duration: 3200 },
  { id: "click2",           duration: 800  },
  { id: "transition2",      duration: 800  },
  { id: "show-downtime",    duration: 2500 },
  { id: "typing3",          duration: 2400 },
  { id: "click3",           duration: 800  },
  { id: "transition3",      duration: 800  },
  { id: "show-trace",       duration: 2500 },
  { id: "typing4",          duration: 3000 },
  { id: "click4",           duration: 800  },
  { id: "transition-final", duration: 1000 },
  { id: "show-final",       duration: 0    }, // stays forever
];

export function useSequenceController() {
  const [stepIndex, setStepIndex] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout>>();
  const startTimeRef = useRef(Date.now());

  const currentStep = TIMELINE[stepIndex];

  const advanceStep = useCallback(() => {
    setStepIndex((prev) => {
      const next = prev + 1;
      if (next >= TIMELINE.length) {
        return prev; // Stay at last step (no loop)
      }
      return next;
    });
    setElapsed(0);
    startTimeRef.current = Date.now();
  }, []);

  useEffect(() => {
    startTimeRef.current = Date.now();

    // Don't set timer or interval for steps with 0 duration (final stay)
    if (currentStep.duration === 0) return;

    timerRef.current = setTimeout(() => {
      advanceStep();
    }, currentStep.duration);

    // Progress tracking — only run during typing steps where progress matters
    const needsProgress = currentStep.id.startsWith("typing") || currentStep.id.startsWith("click") || currentStep.id.startsWith("transition");
    if (!needsProgress) return () => { if (timerRef.current) clearTimeout(timerRef.current); };

    const interval = setInterval(() => {
      setElapsed(Date.now() - startTimeRef.current);
    }, 32); // 30fps is enough for typing animation

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(interval);
    };
  }, [stepIndex, currentStep.duration, advanceStep]);

  const progress = currentStep.duration > 0 ? Math.min(elapsed / currentStep.duration, 1) : 1;

  return {
    step: currentStep.id,
    stepIndex,
    progress,
    elapsed,
    duration: currentStep.duration,
  };
}

export const QUERIES = {
  q1: "Üretim adetlerimi nasıl takip edebilirim?",
  q2: "Hangi makineler ne kadar arıza yapıyor nasıl izlerim?",
  q3: "Seri no bazlı ürün izlemek istiyorum?",
  q4: "Tüm bunları yönetebileceğim bir platform var mı?",
};
