import { Suspense, lazy, type LazyExoticComponent } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppHeader } from "@/components/AppHeader";

const Landing = lazy(() => import("./pages/Landing"));
const Features = lazy(() => import("./pages/Features"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));

const queryClient = new QueryClient();

function RouteSkeleton() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#050914] text-white/70">
      Loading...
    </div>
  );
}

function Page({ component: Component }: { component: LazyExoticComponent<() => JSX.Element> }) {
  return (
    <Suspense fallback={<RouteSkeleton />}>
      <Component />
    </Suspense>
  );
}

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <div
            className="min-h-screen text-white bg-[#0A0A0A]"
            style={{
              fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="relative z-10">
              <AppHeader />
              <Routes>
                <Route path="/" element={<Page component={Landing} />} />
                <Route path="/features" element={<Page component={Features} />} />
                <Route path="/blog" element={<Page component={Blog} />} />
                <Route path="/blog/:slug" element={<Page component={BlogPost} />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
