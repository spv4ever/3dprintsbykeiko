import { useEffect, useState } from 'https://esm.sh/react@18.3.1';
import { applyTheme, getInitialTheme } from '../utils/theme.js';

export const useTheme = () => {
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  return {
    theme,
    toggleTheme: () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))
  };
};
