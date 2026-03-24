import { motion } from "framer-motion";
import { useConfig } from "../config/ConfigContext";
import DynamicIcon from "./DynamicIcon";

const defaultIcons = ["dashboard", "analytics", "factory", "precision_manufacturing", "description"];

interface Props {
  visible: boolean;
}

export default function SideNav({ visible }: Props) {
  const { content } = useConfig();

  return (
    <motion.aside
      className="h-screen w-[72px] hover:w-56 transition-[width] duration-300 fixed left-0 top-0 z-[55] bg-slate-50 flex flex-col pt-20 pb-4 px-2 group overflow-hidden"
      initial={{ x: -80, opacity: 0 }}
      animate={visible ? { x: 0, opacity: 1 } : { x: -80, opacity: 0 }}
      transition={{ type: "spring", stiffness: 150, damping: 22 }}
    >
      <div className="flex flex-col gap-3">
        {content.sideNav.items.map((item, i) => (
          <div
            key={i}
            className={`flex items-center gap-4 px-3 py-2.5 rounded-xl ${
              i === 0 ? "bg-white text-blue-700 shadow-sm" : "text-slate-400"
            }`}
          >
            <DynamicIcon imageKey={`sideNav.item${i}Icon`} fallback={defaultIcons[i] || "circle"} />
            <span className="text-xs uppercase tracking-widest font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="mt-auto px-4 opacity-0 group-hover:opacity-100 transition-opacity">
        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{content.sideNav.factoryLabel}</p>
      </div>
    </motion.aside>
  );
}
