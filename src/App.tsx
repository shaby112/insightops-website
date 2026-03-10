import { Suspense, lazy, type LazyExoticComponent } from "react";
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { BackendUserSync } from "@/components/BackendUserSync";

const Landing = lazy(() => import("./pages/Landing"));
const Features = lazy(() => import("./pages/Features"));
const Pricing = lazy(() => import("./pages/Pricing"));
const Install = lazy(() => import("./pages/Install"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const SignInPage = lazy(() => import("./pages/SignInPage"));
const SignUpPage = lazy(() => import("./pages/SignUpPage"));
const Downloads = lazy(() => import("./pages/Downloads"));
const Account = lazy(() => import("./pages/Account"));
const NotFound = lazy(() => import("./pages/NotFound"));

const queryClient = new QueryClient();

function ProtectedRoute() {
  return (
    <>
      <SignedIn>
        <Outlet />
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
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
      <BackendUserSync />
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Page component={Landing} />} />
            <Route path="/features" element={<Page component={Features} />} />
            <Route path="/pricing" element={<Page component={Pricing} />} />
            <Route path="/install" element={<Page component={Install} />} />
            <Route path="/blog" element={<Page component={Blog} />} />
            <Route path="/blog/:slug" element={<Page component={BlogPost} />} />

            <Route path="/sign-in/*" element={<Page component={SignInPage} />} />
          <Route path="/sign-up/*" element={<Page component={SignUpPage} />} />
          <Route path="/signin/*" element={<Page component={SignInPage} />} />
          <Route path="/signup/*" element={<Page component={SignUpPage} />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/downloads" element={<Page component={Downloads} />} />
            <Route path="/account" element={<Page component={Account} />} />
          </Route>

          <Route path="*" element={<Page component={NotFound} />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
  </HelmetProvider>
);

export default App;
