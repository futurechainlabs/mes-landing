import type { StepId } from "./useSequenceController";
import Screen1_Landing from "../screens/Screen1_Landing";
import Screen2_OEE from "../screens/Screen2_OEE";
import Screen3_Downtime from "../screens/Screen3_Downtime";
import Screen4_Trace from "../screens/Screen4_Trace";
import Screen5_Modules from "../screens/Screen5_Modules";

/**
 * SceneRenderer maps the current step to which screens are visible,
 * their depth (layering), and whether they are entering.
 *
 * Layering rules (from design files):
 * - When Downtime is active: OEE is depth=1
 * - When Trace is active: OEE is depth=2, Downtime is depth=1
 * - When Modules is active: all panels are hidden
 */

interface Props {
  step: StepId;
  progress: number;
}

// Which screens are visible at each step
function getVisibleScreens(step: StepId) {
  switch (step) {
    case "landing":
    case "typing1":
    case "click1":
      return { landing: true, oee: false, downtime: false, trace: false, modules: false };

    case "transition1":
      // Both visible: landing fading out, OEE entering
      return { landing: true, oee: true, downtime: false, trace: false, modules: false };

    case "show-oee":
    case "typing2":
    case "click2":
      return { landing: false, oee: true, downtime: false, trace: false, modules: false };

    case "transition2":
    case "show-downtime":
    case "typing3":
    case "click3":
      return { landing: false, oee: true, downtime: true, trace: false, modules: false };

    case "transition3":
    case "show-trace":
    case "typing4":
    case "click4":
      return { landing: false, oee: true, downtime: true, trace: true, modules: false };

    case "transition-final":
    case "show-final":
      return { landing: false, oee: false, downtime: false, trace: false, modules: true };

    default:
      return { landing: true, oee: false, downtime: false, trace: false, modules: false };
  }
}

function getOEEDepth(step: StepId): number {
  if (["transition1", "show-oee", "typing2", "click2"].includes(step)) return 0;
  if (["transition2", "show-downtime", "typing3", "click3"].includes(step)) return 1;
  if (["transition3", "show-trace", "typing4", "click4"].includes(step)) return 2;
  return 0;
}

function getDowntimeDepth(step: StepId): number {
  if (["transition2", "show-downtime", "typing3", "click3"].includes(step)) return 0;
  if (["transition3", "show-trace", "typing4", "click4"].includes(step)) return 1;
  return 0;
}

export default function SceneRenderer({ step, progress }: Props) {
  const vis = getVisibleScreens(step);

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ isolation: "isolate" }}>
      {/* Grid background */}
      <div className="absolute inset-0 grid-bg opacity-[0.06] pointer-events-none z-0" />

      {/* Screen 1: Landing / Search */}
      {vis.landing && (
        <Screen1_Landing step={step} progress={progress} />
      )}

      {/* Screen 2: OEE Dashboard */}
      {vis.oee && (
        <Screen2_OEE
          depth={getOEEDepth(step)}
          entering={step === "show-oee" || step === "transition1"}
        />
      )}

      {/* Screen 3: Downtime Analysis */}
      {vis.downtime && (
        <Screen3_Downtime
          depth={getDowntimeDepth(step)}
          entering={step === "transition2"}
        />
      )}

      {/* Screen 4: Trace / Serial Tracking */}
      {vis.trace && (
        <Screen4_Trace
          depth={0}
          entering={step === "transition3"}
        />
      )}

      {/* Screen 5: Module Grid */}
      {vis.modules && (
        <Screen5_Modules
          entering={step === "transition-final"}
        />
      )}
    </div>
  );
}
