import { StrictMode, useState, useEffect, lazy, Suspense } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { ConfigProvider } from "./config/ConfigContext";
import App from "./App";

const AdminPanel = lazy(() => import("./admin/AdminPanel"));
const ConnectPage = lazy(() => import("./pages/ConnectPage"));
const LivePage = lazy(() => import("./pages/LivePage"));
const OptimaPage = lazy(() => import("./pages/OptimaPage"));
const TraceModulePage = lazy(() => import("./pages/TraceModulePage"));
const FormsPage = lazy(() => import("./pages/FormsPage"));
const CncPage = lazy(() => import("./pages/CncPage"));
const IntegraPage = lazy(() => import("./pages/IntegraPage"));
const EnergyPage = lazy(() => import("./pages/EnergyPage"));
const TmcPage = lazy(() => import("./pages/TmcPage"));
const CorePage = lazy(() => import("./pages/CorePage"));
const ReferencesPage = lazy(() => import("./pages/ReferencesPage"));
const CaseStudyPage = lazy(() => import("./pages/CaseStudyPage"));
const ContactFormPage = lazy(() => import("./pages/ContactFormPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

type Route = "demo" | "admin" | "connect" | "live" | "optima" | "trace" | "forms" | "cnc" | "integra" | "energy" | "tmc" | "core" | "references" | "case" | "contact" | "about";

interface RouteState {
  route: Route;
  caseIndex: number;
}

function getRouteState(): RouteState {
  const hash = window.location.hash.replace("#", "");
  if (["admin", "connect", "live", "optima", "trace", "forms", "cnc", "integra", "energy", "tmc", "core", "references", "contact", "about"].includes(hash)) {
    return { route: hash as Route, caseIndex: 0 };
  }
  const caseMatch = hash.match(/^case-(\d+)$/);
  if (caseMatch) {
    return { route: "case", caseIndex: parseInt(caseMatch[1], 10) };
  }
  return { route: "demo", caseIndex: 0 };
}

const Loading = () => (
  <div className="flex items-center justify-center h-screen text-slate-400">Loading...</div>
);

function Root() {
  const [state, setState] = useState<RouteState>(getRouteState);

  useEffect(() => {
    const onHash = () => setState(getRouteState());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  return (
    <ConfigProvider>
      <Suspense fallback={<Loading />}>
        {state.route === "admin" ? <AdminPanel />
          : state.route === "connect" ? <ConnectPage />
          : state.route === "live" ? <LivePage />
          : state.route === "optima" ? <OptimaPage />
          : state.route === "trace" ? <TraceModulePage />
          : state.route === "forms" ? <FormsPage />
          : state.route === "cnc" ? <CncPage />
          : state.route === "integra" ? <IntegraPage />
          : state.route === "energy" ? <EnergyPage />
          : state.route === "tmc" ? <TmcPage />
          : state.route === "core" ? <CorePage />
          : state.route === "references" ? <ReferencesPage />
          : state.route === "contact" ? <ContactFormPage />
          : state.route === "about" ? <AboutPage />
          : state.route === "case" ? <CaseStudyPage index={state.caseIndex} />
          : <App />}
      </Suspense>
    </ConfigProvider>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Root />
  </StrictMode>
);
