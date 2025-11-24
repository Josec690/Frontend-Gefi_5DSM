import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Appearance } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { lightTheme, darkTheme } from '../theme/themes';

const STORAGE_KEY = 'app_theme_preference';

const ThemeContext = createContext({
  themeName: 'dark',
  colors: darkTheme.colors,
  toggleTheme: () => {},
  setTheme: (_name) => {},
});

export function ThemeProvider({ children }) {
  const system = Appearance.getColorScheme?.() || 'light';
  const [themeName, setThemeName] = useState(system === 'dark' ? 'dark' : 'light');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem(STORAGE_KEY);
        if (saved === 'dark' || saved === 'light') setThemeName(saved);
      } catch {}
    })();
  }, []);

  const colors = useMemo(() => (themeName === 'dark' ? darkTheme.colors : lightTheme.colors), [themeName]);

  const setTheme = useCallback(async (name) => {
    const valid = name === 'dark' || name === 'light' ? name : 'light';
    setThemeName(valid);
    try { await AsyncStorage.setItem(STORAGE_KEY, valid); } catch {}
  }, []);

  const toggleTheme = useCallback(() => setTheme(themeName === 'dark' ? 'light' : 'dark'), [setTheme, themeName]);

  const value = useMemo(() => ({ themeName, colors, toggleTheme, setTheme }), [themeName, colors, toggleTheme, setTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useAppTheme() {
  return useContext(ThemeContext);
}
