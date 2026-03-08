import { useAuth } from "@clerk/clerk-react";
import { useEffect, useRef } from "react";
import { apiFetchWithToken } from "@/lib/api";

type MeResponse = {
  id: string;
  email?: string;
  clerk_id: string;
};

export function BackendUserSync() {
  const { isSignedIn, userId, getToken } = useAuth();
  const syncedUser = useRef<string | null>(null);

  useEffect(() => {
    if (!isSignedIn || !userId) return;
    if (syncedUser.current === userId) return;

    let cancelled = false;

    (async () => {
      const token = await getToken();
      if (!token || cancelled) return;

      await apiFetchWithToken<MeResponse>("/api/v1/me", token, {
        method: "GET",
      });

      if (!cancelled) {
        syncedUser.current = userId;
      }
    })().catch((error) => {
      console.error("Failed to sync signed-in user to backend:", error);
    });

    return () => {
      cancelled = true;
    };
  }, [isSignedIn, userId, getToken]);

  return null;
}
