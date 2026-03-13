import React, { useMemo } from 'https://esm.sh/react@18.3.1';
import { sections, socialLinks, dataFiles } from './config/siteConfig.js';
import { useTheme } from './hooks/useTheme.js';
import { useContentMap } from './hooks/useContentMap.js';
import { Header, Hero, QuickSections, Footer } from './components/Layout.js';
import {
  AccessorySection,
  BlogSection,
  FilamentSection,
  MakerworldSection,
  SocialSection
} from './components/ContentSections.js';

const h = React.createElement;

export function App() {
  const currentYear = useMemo(() => new Date().getFullYear(), []);
  const { theme, toggleTheme } = useTheme();
  const content = useContentMap(dataFiles);

  return h(
    React.Fragment,
    null,
    h('div', { className: 'bg-decoration', 'aria-hidden': 'true' }),
    Header({ sections, theme, onToggleTheme: toggleTheme }),
    h(
      'main',
      { className: 'container page-content', id: 'inicio' },
      Hero(),
      QuickSections({ sections }),
      FilamentSection({ state: content.filamento }),
      AccessorySection({ state: content.accesorios }),
      MakerworldSection({ state: content.makerworld }),
      BlogSection({ state: content.blog }),
      SocialSection({ links: socialLinks })
    ),
    Footer({ year: currentYear })
  );
}
