import { Suspense, lazy, type LazyExoticComponent } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppHeader } from "@/components/AppHeader";

const CHUNK_RELOAD_KEY = "__kuantra_route_chunk_reload__";

function isChunkLoadError(error: unknown) {
  const message = String((error as any)?.message || error || "").toLowerCase();
  return (
    message.includes("failed to fetch dynamically imported module") ||
    message.includes("loading chunk") ||
    message.includes("chunkloaderror") ||
    message.includes("importing a module script failed")
  );
}

function lazyWithChunkRecovery(importer: () => Promise<{ default: () => JSX.Element }>) {
  return lazy(async () => {
    try {
      return await importer();
    } catch (error) {
      if (typeof window !== "undefined" && isChunkLoadError(error)) {
        const reloaded = window.sessionStorage.getItem(CHUNK_RELOAD_KEY) === "1";
        if (!reloaded) {
          window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
          window.location.reload();
        }
      }
      throw error;
    }
  });
}

const Landing = lazyWithChunkRecovery(() => import("./pages/Landing"));
const Features = lazyWithChunkRecovery(() => import("./pages/Features"));
const Blog = lazyWithChunkRecovery(() => import("./pages/Blog"));
const BlogPost = lazyWithChunkRecovery(() => import("./pages/BlogPost"));
const Waitlist = lazyWithChunkRecovery(() => import("./pages/Waitlist"));
const BlogAdmin = lazyWithChunkRecovery(() => import("./pages/BlogAdmin"));

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
                <Route path="/waitlist" element={<Page component={Waitlist} />} />
                <Route path="/blog/publish" element={<Page component={BlogAdmin} />} />
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
