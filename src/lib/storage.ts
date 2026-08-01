import {
  useCallback,
  useEffect,
  useState,
  useSyncExternalStore,
} from "react";
import { dateKey } from "./dateKey";

const STORAGE_PREFIX = "gym-todo:v1";

// -------------------- shared external store --------------------
// Multiple hook instances that reference the same storage key must observe
// the same value. useState-per-instance would fragment the truth, so we keep
// a single mutable snapshot per key and let React subscribe via
// useSyncExternalStore.

type Store<T> = {
  value: T;
  subs: Set<() => void>;
};

const stores = new Map<string, Store<unknown>>();

function readJSON<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJSON<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // ignore quota errors
  }
}

function getStore<T>(key: string, initial: T): Store<T> {
  const existing = stores.get(key) as Store<T> | undefined;
  if (existing) return existing;
  const fresh: Store<T> = {
    value: readJSON<T>(key, initial),
    subs: new Set(),
  };
  stores.set(key, fresh as Store<unknown>);
  return fresh;
}

function useKeyedState<T>(
  key: string,
  initial: T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  const store = getStore(key, initial);

  const subscribe = useCallback(
    (cb: () => void) => {
      store.subs.add(cb);
      return () => {
        store.subs.delete(cb);
      };
    },
    [store],
  );

  const getSnapshot = useCallback(() => store.value, [store]);

  const value = useSyncExternalStore(subscribe, getSnapshot, getSnapshot);

  const setValue = useCallback(
    (updater: T | ((prev: T) => T)) => {
      const next =
        typeof updater === "function"
          ? (updater as (p: T) => T)(store.value)
          : updater;
      if (Object.is(next, store.value)) return;
      store.value = next;
      writeJSON(key, next);
      store.subs.forEach((cb) => cb());
    },
    [store, key],
  );

  return [value, setValue];
}

// Cross-tab sync: if another tab writes to a key we know about, refresh.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (e) => {
    if (!e.key || !stores.has(e.key)) return;
    const store = stores.get(e.key)!;
    try {
      const next = e.newValue === null ? null : JSON.parse(e.newValue);
      store.value = next;
      store.subs.forEach((cb) => cb());
    } catch {
      // ignore corrupted foreign writes
    }
  });
}

// -------------------- date-scoped state --------------------
// Automatically re-keys when the local calendar date changes (midnight
// rollover, tab regains focus, or visibility change) so the app always
// reflects "today".

export function useDailyState<T>(
  namespace: string,
  initial: T,
): [T, (updater: T | ((prev: T) => T)) => void, string] {
  const [today, setToday] = useState<string>(() => dateKey());

  useEffect(() => {
    function check() {
      const current = dateKey();
      if (current !== today) setToday(current);
    }
    const id = window.setInterval(check, 30_000);
    window.addEventListener("focus", check);
    document.addEventListener("visibilitychange", check);
    return () => {
      window.clearInterval(id);
      window.removeEventListener("focus", check);
      document.removeEventListener("visibilitychange", check);
    };
  }, [today]);

  const fullKey = `${STORAGE_PREFIX}:${namespace}:${today}`;
  const [value, setValue] = useKeyedState<T>(fullKey, initial);
  return [value, setValue, today];
}

// -------------------- persistent state (across days) --------------------

export function usePersistentState<T>(
  key: string,
  initial: T,
): [T, (updater: T | ((prev: T) => T)) => void] {
  return useKeyedState<T>(`${STORAGE_PREFIX}:${key}`, initial);
}
