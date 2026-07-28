import { useEffect, useSyncExternalStore } from 'react';

/**
 * Visitor counter client for `/api/views`.
 *
 * The request fires once per page load no matter how many components ask for it,
 * and only the *first* visit from a browser sends a POST (the server also dedupes
 * by IP per day, so a cleared localStorage doesn't inflate the count).
 */

export type ViewsState = {
  status: 'loading' | 'ready' | 'error';
  count: number | null;
  /** True when this page load is what incremented the counter (i.e. a first-time visitor). */
  counted: boolean;
};

const ENDPOINT = '/api/views';
const STORAGE_KEY = 'danielos:visited:v1';

let state: ViewsState = { status: 'loading', count: null, counted: false };
let started = false;
const listeners = new Set<() => void>();

function setState(next: ViewsState) {
  state = next;
  for (const listener of listeners) listener();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

function getSnapshot() {
  return state;
}

/** localStorage throws in private mode / blocked-cookie setups — never let it break the page. */
function isReturningVisitor(): boolean {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

function rememberVisit() {
  try {
    localStorage.setItem(STORAGE_KEY, '1');
  } catch {
    /* ignore */
  }
}

async function load() {
  const returning = isReturningVisitor();
  try {
    const res = await fetch(ENDPOINT, { method: returning ? 'GET' : 'POST' });
    if (!res.ok) throw new Error(`views responded ${res.status}`);

    const data = (await res.json()) as { views?: number | null };
    if (!returning) rememberVisit();

    setState(
      typeof data.views === 'number'
        ? { status: 'ready', count: data.views, counted: !returning }
        : { status: 'error', count: null, counted: false },
    );
  } catch {
    setState({ status: 'error', count: null, counted: false });
  }
}

/** Counts the visit without subscribing to the result (no re-render). */
export function trackVisit() {
  if (started) return;
  started = true;
  void load();
}

/** Counts the visit and re-renders when the count arrives. */
export function useViews(): ViewsState {
  useEffect(trackVisit, []);
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot);
}
