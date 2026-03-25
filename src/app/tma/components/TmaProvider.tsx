"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";

interface TmaContextValue {
  initDataRaw: string | undefined;
  isReady: boolean;
  isDark: boolean;
}

const TmaContext = createContext<TmaContextValue>({
  initDataRaw: undefined,
  isReady: false,
  isDark: true,
});

export function useTma() {
  return useContext(TmaContext);
}

interface TmaProviderProps {
  children: ReactNode;
}

export function TmaProvider({ children }: TmaProviderProps) {
  const [initDataRaw, setInitDataRaw] = useState<string | undefined>(undefined);
  const [isReady, setIsReady] = useState(false);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      try {
        const sdk = await import("@telegram-apps/sdk-react");

        cleanup = sdk.init();

        // Read init data
        try {
          const raw = sdk.retrieveRawInitData();
          setInitDataRaw(raw);
        } catch {
          setInitDataRaw(undefined);
        }

        // Mount theme params and bind CSS variables
        try {
          const tpMod = await import("@telegram-apps/sdk");

          // Mount mini app
          if (tpMod.mountMiniAppSync.isAvailable()) {
            tpMod.mountMiniAppSync();
          }

          // Mount theme params and bind to CSS vars
          if (tpMod.mountThemeParamsSync) {
            tpMod.mountThemeParamsSync();
          }
          if (tpMod.bindThemeParamsCssVars) {
            tpMod.bindThemeParamsCssVars();
          }

          // Check if dark mode
          try {
            const darkSignal = tpMod.isThemeParamsDark;
            if (darkSignal && typeof darkSignal === "function") {
              setIsDark(darkSignal());
            } else if (darkSignal !== undefined) {
              setIsDark(Boolean(darkSignal));
            }
          } catch {
            // Fallback — check CSS
          }
        } catch {
          // Outside Telegram — ignore
        }
      } catch {
        // SDK unavailable — dev mode fallback
      } finally {
        setIsReady(true);
      }
    };

    setup();

    return () => {
      if (cleanup) cleanup();
    };
  }, []);

  if (!isReady) {
    return (
      <div
        className="min-h-dvh flex items-center justify-center"
        style={{ background: "var(--tg-theme-bg-color, #0F0F0F)" }}
      >
        <div
          className="w-6 h-6 rounded-full animate-spin"
          style={{
            border: "2px solid var(--tg-theme-hint-color, #555)",
            borderTopColor: "transparent",
          }}
        />
      </div>
    );
  }

  return (
    <TmaContext.Provider value={{ initDataRaw, isReady, isDark }}>
      {children}
    </TmaContext.Provider>
  );
}
