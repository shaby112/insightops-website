import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ClerkProvider } from "@clerk/clerk-react";
import App from "./App.tsx";
import "./index.css";

const DEFAULT_PUBLISHABLE_KEY =
  "pk_test_Z29yZ2VvdXMtZ29yaWxsYS01OC5jbGVyay5hY2NvdW50cy5kZXYk";
const PUBLISHABLE_KEY =
  (import.meta as any).env?.VITE_CLERK_PUBLISHABLE_KEY || DEFAULT_PUBLISHABLE_KEY;
const CHUNK_RELOAD_KEY = "__kuantra_chunk_reload__";

function extractErrorMessage(errorLike: unknown): string {
  if (!errorLike) return "";
  if (typeof errorLike === "string") return errorLike;
  if (typeof errorLike === "object") {
    const maybeError = errorLike as { message?: string; reason?: { message?: string } };
    return maybeError.message || maybeError.reason?.message || "";
  }
  return "";
}

function isRecoverableChunkError(message: string): boolean {
  const text = message.toLowerCase();
  return (
    text.includes("failed to fetch dynamically imported module") ||
    text.includes("loading chunk") ||
    text.includes("chunkloaderror") ||
    text.includes("importing a module script failed")
  );
}

function installChunkRecovery() {
  if (typeof window === "undefined") return;

  const tryRecover = (errorLike: unknown) => {
    const message = extractErrorMessage(errorLike);
    if (!isRecoverableChunkError(message)) return false;

    const alreadyRetried = window.sessionStorage.getItem(CHUNK_RELOAD_KEY) === "1";
    if (!alreadyRetried) {
      window.sessionStorage.setItem(CHUNK_RELOAD_KEY, "1");
      window.location.reload();
      return true;
    }
    return false;
  };

  window.addEventListener("error", (event) => {
    tryRecover(event.error || event.message);
  });

  window.addEventListener("unhandledrejection", (event) => {
    if (tryRecover(event.reason)) {
      event.preventDefault();
    }
  });

  // Clear retry guard after a stable boot so future deploys can recover once.
  window.setTimeout(() => {
    window.sessionStorage.removeItem(CHUNK_RELOAD_KEY);
  }, 15000);
}

function MissingConfig() {
  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
      <div className="max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm">
        <h1 className="text-2xl font-semibold mb-3">Configuration Required</h1>
        <p className="text-muted-foreground leading-relaxed">
          `VITE_CLERK_PUBLISHABLE_KEY` is missing. Add it in your Vercel project environment
          variables and redeploy.
        </p>
      </div>
    </div>
  );
}

type RootBoundaryProps = {
  children: React.ReactNode;
};

type RootBoundaryState = {
  hasError: boolean;
  message: string;
};

class RootErrorBoundary extends React.Component<RootBoundaryProps, RootBoundaryState> {
  constructor(props: RootBoundaryProps) {
    super(props);
    this.state = { hasError: false, message: "" };
  }

  static getDerivedStateFromError(error: unknown): RootBoundaryState {
    return { hasError: true, message: extractErrorMessage(error) || "Unexpected runtime error." };
  }

  componentDidCatch(error: unknown) {
    console.error("Root render error:", error);
  }

  render() {
    if (!this.state.hasError) return this.props.children;

    return (
      <div className="min-h-screen bg-background text-foreground flex items-center justify-center px-6">
        <div className="max-w-xl rounded-2xl border border-border bg-card p-8 shadow-sm">
          <h1 className="text-2xl font-semibold mb-3">Unable to load the website</h1>
          <p className="text-muted-foreground leading-relaxed mb-5">
            The app hit a runtime error while loading. Please refresh once.
          </p>
          {this.state.message ? (
            <pre className="mb-5 whitespace-pre-wrap rounded-lg border border-border/80 bg-muted p-3 text-xs text-muted-foreground">
              {this.state.message}
            </pre>
          ) : null}
          <button
            type="button"
            onClick={() => window.location.reload()}
            className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
          >
            Reload Page
          </button>
        </div>
      </div>
    );
  }
}

installChunkRecovery();
const root = createRoot(document.getElementById("root")!);

if (!PUBLISHABLE_KEY) {
  root.render(
    <StrictMode>
      <RootErrorBoundary>
        <MissingConfig />
      </RootErrorBoundary>
    </StrictMode>,
  );
} else {
  root.render(
    <StrictMode>
      <RootErrorBoundary>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <App />
        </ClerkProvider>
      </RootErrorBoundary>
    </StrictMode>,
  );
}
