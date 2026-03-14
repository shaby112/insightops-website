import { Suspense, lazy, type LazyExoticComponent } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { AppHeader } from "@/components/AppHeader";

const Landing = lazy(() => import("./pages/Landing"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Install = lazy(() => import("./pages/Install"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Downloads = lazy(() => import("./pages/Downloads"));
const Account = lazy(() => import("./pages/Account"));
const Auth = lazy(() => import("./pages/Auth"));
const NotFound = lazy(() => import("./pages/NotFound"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const queryClient = new QueryClient();

function ProtectedRoute() {
  return <Outlet />;
}

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
            className="min-h-screen text-white"
            style={{
              backgroundColor: "#0A0A0A",
              fontFamily: "Geist, Inter, ui-sans-serif, system-ui, sans-serif",
            }}
          >
            <div className="pointer-events-none fixed inset-0 z-0 opacity-30 [background-image:linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] [background-size:56px_56px]" />
            <div className="relative z-10">
              <AppHeader />
              <Routes>
                <Route path="/" element={<Page component={Landing} />} />
                <Route path="/auth" element={<Page component={Auth} />} />
                <Route path="/features" element={<Page component={Features} />} />
                <Route path="/pricing" element={<Page component={Pricing} />} />
                <Route path="/install" element={<Page component={Install} />} />
                <Route path="/blog" element={<Page component={Blog} />} />
                <Route path="/blog/:slug" element={<Page component={BlogPost} />} />

                <Route path="/sign-in/*" element={<Page component={Auth} />} />
                <Route path="/sign-up/*" element={<Page component={Auth} />} />
                <Route path="/signin/*" element={<Page component={Auth} />} />
                <Route path="/signup/*" element={<Page component={Auth} />} />

                <Route element={<ProtectedRoute />}>
                  <Route path="/downloads" element={<Page component={Downloads} />} />
                  <Route path="/account" element={<Page component={Account} />} />
                  <Route path="/dashboard" element={<Page component={Dashboard} />} />
                  <Route path="/license" element={<Page component={Dashboard} />} />
                </Route>

                <Route path="*" element={<Page component={NotFound} />} />
              </Routes>
            </div>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
