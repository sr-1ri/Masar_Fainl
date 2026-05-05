import { lazy, Suspense } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import Home from "@/pages/Home";

const Chat = lazy(() => import("@/pages/Chat"));
const Specializations = lazy(() => import("@/pages/Specializations"));
const Admissions = lazy(() => import("@/pages/Admissions"));
const Methods = lazy(() => import("@/pages/Methods"));
const Resources = lazy(() => import("@/pages/Resources"));
const Personality = lazy(() => import("@/pages/Personality"));
const StudyTips = lazy(() => import("@/pages/StudyTips"));
const Stages = lazy(() => import("@/pages/Stages"));
const NotFound = lazy(() => import("@/pages/not-found"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { refetchOnWindowFocus: false, staleTime: 30_000 },
  },
});

function PageFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center text-[hsl(var(--gold-deep))]">
      <Loader2 className="w-8 h-8 animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageFallback />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/chat" component={Chat} />
        <Route path="/specializations" component={Specializations} />
        <Route path="/admissions" component={Admissions} />
        <Route path="/methods" component={Methods} />
        <Route path="/resources" component={Resources} />
        <Route path="/personality" component={Personality} />
        <Route path="/study-tips" component={StudyTips} />
        <Route path="/stages" component={Stages} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <div dir="rtl" className="min-h-screen bg-ivory flex flex-col">
            <Navbar />
            <div className="flex-1">
              <Router />
            </div>
            <Footer />
          </div>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
