import { useSequenceController } from "./engine/useSequenceController";
import SceneRenderer from "./engine/SceneRenderer";
import TopNav from "./components/TopNav";
import SideNav from "./components/SideNav";
import BottomBar from "./components/BottomBar";

/**
 * App orchestrates the entire cinematic demo.
 *
 * All timing is driven by useSequenceController.
 * No user interaction until final "show-final" step.
 * The sequence loops automatically.
 */

// Steps where the sidebar should be visible
const SIDEBAR_STEPS = new Set([
  "show-oee", "typing2", "click2",
  "transition2", "show-downtime", "typing3", "click3",
  "transition3", "show-trace", "typing4", "click4",
  "transition-final", "show-final",
]);

// Steps where the bottom bar should be visible
const BOTTOM_BAR_STEPS = new Set([
  "show-oee", "typing2", "click2",
  "transition2", "show-downtime", "typing3", "click3",
  "transition3", "show-trace", "typing4", "click4",
]);

export default function App() {
  const { step, progress } = useSequenceController();

  const showSidebar = SIDEBAR_STEPS.has(step);
  const showBottomBar = BOTTOM_BAR_STEPS.has(step);

  return (
    <div className="h-screen w-screen relative overflow-hidden bg-surface">

      {/* Fixed chrome */}
      <TopNav />
      <SideNav visible={showSidebar} />

      {/* Scene renderer: maps step → screens */}
      <SceneRenderer step={step} progress={progress} />

      {/* Bottom interaction bar */}
      {showBottomBar && (
        <BottomBar step={step} progress={progress} />
      )}

    </div>
  );
}
