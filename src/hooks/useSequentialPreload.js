import { useEffect } from 'react';

const isVideo = (url) => /\.(mp4|webm|mov)$/i.test(url);

// Warm a single asset into the browser's HTTP cache. Images resolve on
// load/error; videos are fetched whole so the <video> (which stays
// preload="none") can later play instantly from cache.
function warm(url) {
  return new Promise((resolve) => {
    if (isVideo(url)) {
      fetch(url)
        .then((r) => r.blob())
        .then(() => resolve())
        .catch(() => resolve());
    } else {
      const img = new Image();
      img.onload = img.onerror = () => resolve();
      img.src = url;
    }
  });
}

/**
 * Loads assets in a deliberate top-to-bottom order rather than letting the
 * browser race them. `tiers` is an array of URL arrays: every asset in a tier
 * finishes before the next tier starts, and within a tier they load one at a
 * time in order. So the page fills its first images top to bottom, and only
 * once those are all cached does it begin pulling the heavier second tier.
 *
 * It waits for `load` (so it never competes with first paint) and honours the
 * Data Saver hint by skipping the heavy video tier on metered connections.
 *
 * `tiers` must be a stable reference (declare it at module scope).
 */
export default function useSequentialPreload(tiers) {
  useEffect(() => {
    if (!tiers || !tiers.length) return;
    let cancelled = false;
    const conn = navigator.connection;
    const saveData = !!(conn && conn.saveData);

    async function run() {
      for (const tier of tiers) {
        for (const url of tier) {
          if (cancelled) return;
          if (isVideo(url) && saveData) continue; // don't burn metered data on demos
          await warm(url);
        }
      }
    }

    const kick = () => {
      if (cancelled) return;
      if ('requestIdleCallback' in window) {
        requestIdleCallback(run, { timeout: 2000 });
      } else {
        setTimeout(run, 200);
      }
    };

    if (document.readyState === 'complete') {
      kick();
    } else {
      window.addEventListener('load', kick, { once: true });
    }

    return () => {
      cancelled = true;
      window.removeEventListener('load', kick);
    };
  }, [tiers]);
}
