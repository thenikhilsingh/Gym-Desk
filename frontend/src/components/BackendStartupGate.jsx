import { useEffect, useState } from "react";
import axios from "axios";
import BackendStarting from "../pages/BackendStarting";

const RETRY_DELAY = 5000;
const REQUEST_TIMEOUT = 10000;
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export default function BackendStartupGate({ children }) {
  const [isBackendReady, setIsBackendReady] = useState(false);

  useEffect(() => {
    if (!API_BASE_URL) {
      return;
    }

    let isMounted = true;
    let retryTimer;
    const controller = new AbortController();
    const healthUrl = `${API_BASE_URL.replace(/\/+$/, "")}/api/health`;

    const checkBackend = async () => {
      try {
        await axios.get(healthUrl, {
          timeout: REQUEST_TIMEOUT,
          signal: controller.signal,
        });

        if (isMounted) {
          setIsBackendReady(true);
        }
      } catch {
        if (isMounted) {
          retryTimer = window.setTimeout(checkBackend, RETRY_DELAY);
        }
      }
    };

    checkBackend();

    return () => {
      isMounted = false;
      window.clearTimeout(retryTimer);
      controller.abort();
    };
  }, []);

  if (!isBackendReady) {
    return <BackendStarting configurationError={!API_BASE_URL} />;
  }

  return children;
}
