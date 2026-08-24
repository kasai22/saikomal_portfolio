"use client";

import { useSyncExternalStore } from "react";
import {
  getQuerySnapshot,
  getServerQuerySnapshot,
  subscribeToQuery,
} from "@/lib/animations/utils";

/**
 * SSR-safe media query. Reads the real value during render on the client
 * rather than in an effect, so there is no first-render frame where every
 * query reports `false`.
 *
 * The server snapshot is always `false` — see `getServerQuerySnapshot` for
 * why that direction is the right default.
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    subscribeToQuery(query),
    getQuerySnapshot(query),
    getServerQuerySnapshot,
  );
}
