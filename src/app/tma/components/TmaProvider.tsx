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
}

const TmaContext = createContext<TmaContextValue>({
  initDataRaw: undefined,
  isReady: false,
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

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const setup = async () => {
      try {
        const sdk = await import("@telegram-apps/sdk-react");

        // init() sets up event listeners so the SDK can communicate with Telegram
        cleanup = sdk.init();

        // Try to read raw init data
        try {
          const raw = sdk.retrieveRawInitData();
          setInitDataRaw(raw);
        } catch {
          // Not in Telegram or dev mode — initData will be undefined
          setInitDataRaw(undefined);
        }

        // Mount mini-app and signal ready
        try {
          const miniAppSdk = await import("@telegram-apps/sdk");
          if (miniAppSdk.mountMiniAppSync.isAvailable()) {
            miniAppSdk.mountMiniAppSync();
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
      <div className="min-h-dvh bg-[#050505] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#f97316] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <TmaContext.Provider value={{ initDataRaw, isReady }}>
      {children}
    </TmaContext.Provider>
  );
}
