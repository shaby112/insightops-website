import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import { BackendUserSync } from "@/components/BackendUserSync";
import Landing from "./pages/Landing";
import Features from "./pages/Features";
import NotFound from "./pages/NotFound";
import Pricing from "./pages/Pricing";
import Downloads from "./pages/Downloads";
import Account from "./pages/Account";
import Install from "./pages/Install";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";

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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <BackendUserSync />
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/install" element={<Install />} />

          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage />} />
          <Route path="/signin/*" element={<SignInPage />} />
          <Route path="/signup/*" element={<SignUpPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/account" element={<Account />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
