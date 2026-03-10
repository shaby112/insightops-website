import { Helmet } from "react-helmet-async";
import { SignIn } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";

const clerkAppearance = {
  variables: {
    colorPrimary: "#7C5FF0",
    colorBackground: "#0A1127",
    colorInputBackground: "#111D38",
    colorInputText: "#E8E8FF",
    colorText: "#E0E8FF",
    colorTextSecondary: "#8B9CC8",
    borderRadius: "0.75rem",
    colorNeutral: "#8B9CC8",
    fontFamily: "'Space Grotesk', system-ui, sans-serif",
  },
  elements: {
    rootBox: "w-full",
    card: "bg-[#0A1127] border border-white/10 shadow-2xl shadow-black/50 rounded-2xl",
    headerTitle: "text-white font-semibold",
    headerSubtitle: "text-white/50",
    socialButtonsBlockButton:
      "border-white/10 bg-white/[0.04] text-white/80 hover:bg-white/[0.08] hover:text-white",
    formFieldLabel: "text-white/70 text-sm",
    formFieldInput:
      "bg-[#111D38] border-white/10 text-white placeholder:text-white/25 focus:border-violet-500/60 focus:ring-violet-500/20",
    formButtonPrimary:
      "bg-violet-600 hover:bg-violet-500 text-white shadow-lg shadow-violet-900/40",
    footerActionLink: "text-violet-400 hover:text-violet-300",
    dividerLine: "bg-white/10",
    dividerText: "text-white/30",
    identityPreviewEditButton: "text-violet-400 hover:text-violet-300",
    alertText: "text-white/70",
    formFieldAction: "text-violet-400 hover:text-violet-300",
    otpCodeFieldInput:
      "bg-[#111D38] border-white/10 text-white",
    logoBox: "hidden",
  },
};

export default function SignInPage() {
  return (
    <div className="dark">
      <Helmet>
        <title>Sign In | Kuantra</title>
        <meta name="description" content="Sign in to your Kuantra account to access your dashboards and data models." />
      </Helmet>

      <div className="min-h-screen bg-[#030C1A] text-white font-sans flex flex-col">
        {/* Background glow */}
        <div className="pointer-events-none fixed inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-violet-600/10 blur-[120px]" />
        </div>

        {/* Top bar */}
        <header className="flex h-16 items-center justify-between border-b border-white/[0.07] px-6">
          <Link to="/" className="flex items-center gap-3">
            <Logo size="sm" showText={false} />
            <span className="text-[17px] font-semibold tracking-tight text-white">Kuantra</span>
          </Link>
          <Link to="/sign-up" className="text-sm text-white/40 hover:text-white/70 transition-colors">
            Don't have an account? <span className="text-violet-400 hover:text-violet-300">Sign up</span>
          </Link>
        </header>

        {/* Centered Clerk component */}
        <div className="flex flex-1 items-center justify-center px-6 py-6">
          <div className="w-full max-w-md">
            {/* Logo above card */}
            <div className="mb-5 flex flex-col items-center text-center">
              <Logo size="sm" showText={false} className="mb-3" />
              <h1 className="text-xl font-bold text-white">Welcome back</h1>
              <p className="mt-1 text-sm text-white/40">Sign in to your Kuantra account</p>
            </div>

            <SignIn
              routing="path"
              path="/sign-in"
              appearance={clerkAppearance}
              signUpUrl="/sign-up"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
