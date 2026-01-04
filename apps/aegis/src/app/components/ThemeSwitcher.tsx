import { useCallback, useEffect, useState } from 'react';
import { DeviceDesktop, Moon, Sun } from 'tabler-icons-react';

interface ThemeSwitcherProps {
  className?: string;
}

type Theme = 'light' | 'dark' | 'auto';

export function ThemeSwitcher({ className = '' }: ThemeSwitcherProps) {
  const [theme, setTheme] = useState<Theme>('auto');

  // Get the actual theme that should be applied (resolves 'auto' to system preference)
  const getResolvedTheme = useCallback((themeValue: Theme): 'light' | 'dark' => {
    if (themeValue === 'auto') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return themeValue;
  }, []);

  // Apply theme to document
  const applyTheme = useCallback(
    (themeValue: Theme) => {
      const resolvedTheme = getResolvedTheme(themeValue);
      document.documentElement.setAttribute('data-theme', resolvedTheme);
    },
    [getResolvedTheme]
  );

  useEffect(() => {
    // Get theme from localStorage or default to auto
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme: Theme = savedTheme || 'auto';

    setTheme(initialTheme);
    applyTheme(initialTheme);

    // Listen for system theme changes when in auto mode
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = () => {
      if (theme === 'auto') {
        applyTheme('auto');
      }
    };

    mediaQuery.addEventListener('change', handleSystemThemeChange);

    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme, applyTheme]);

  const toggleTheme = () => {
    const themeSequence: Theme[] = ['light', 'dark', 'auto'];
    const currentIndex = themeSequence.indexOf(theme);
    const newTheme = themeSequence[(currentIndex + 1) % themeSequence.length];

    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
    applyTheme(newTheme);
  };

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun size={20} />;
      case 'dark':
        return <Moon size={20} />;
      case 'auto':
        return <DeviceDesktop size={20} />;
      default:
        return <Sun size={20} />;
    }
  };

  const getAriaLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode';
      case 'dark':
        return 'Switch to auto mode';
      case 'auto':
        return 'Switch to light mode';
      default:
        return 'Switch theme';
    }
  };

  const getTitle = () => {
    switch (theme) {
      case 'light':
        return 'Current: Light theme. Click to switch to dark mode';
      case 'dark':
        return 'Current: Dark theme. Click to switch to auto mode';
      case 'auto':
        return `Current: Auto theme (${getResolvedTheme('auto')}). Click to switch to light mode`;
      default:
        return 'Switch theme';
    }
  };

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={`p-2 rounded-full hover:bg-blue-700 transition-colors ${className}`}
      aria-label={getAriaLabel()}
      title={getTitle()}
    >
      {getThemeIcon()}
    </button>
  );
}

export default ThemeSwitcher;
