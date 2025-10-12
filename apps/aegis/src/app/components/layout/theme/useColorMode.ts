import { useEffect, useLayoutEffect, useMemo, useState } from 'react';

type Mode = 'light' | 'dark' | 'auto';
const STORAGE_KEY = 'theme';

function getSystemPrefersDark() {
  return (
    window.matchMedia &&
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );
}

function applyTheme(mode: Mode) {
  const actual =
    mode === 'auto' ? (getSystemPrefersDark() ? 'dark' : 'light') : mode;
  document.documentElement.setAttribute('data-bs-theme', actual);
}

export function useColorMode() {
  const [mode, setMode] = useState<Mode>(() => {
    if (typeof window === 'undefined') return 'light';
    const saved = (localStorage.getItem(STORAGE_KEY) as Mode | null) || 'auto';
    return saved;
  });

  // Apply chosen theme and persist
  useLayoutEffect(() => {
    applyTheme(mode);
    localStorage.setItem(STORAGE_KEY, mode);
  }, [mode]);

  // React to OS changes when in auto
  useEffect(() => {
    if (mode !== 'auto') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => applyTheme('auto');
    mq.addEventListener?.('change', onChange);
    return () => mq.removeEventListener?.('change', onChange);
  }, [mode]);

  const isDark = useMemo(() => {
    if (mode === 'auto') return getSystemPrefersDark();
    return mode === 'dark';
  }, [mode]);

  return { mode, setMode, isDark };
}
