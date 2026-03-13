import React from 'https://esm.sh/react@18.3.1';

const h = React.createElement;

export const Header = ({ sections, theme, onToggleTheme }) =>
  h(
    'header',
    { className: 'container site-header' },
    h(
      'a',
      { className: 'brand', href: '#inicio' },
      h('span', { className: 'brand__logo', 'aria-hidden': 'true' }, '3DK'),
      h('span', null, '3D Prints by Keiko')
    ),
    h(
      'nav',
      { className: 'main-nav', 'aria-label': 'Navegación principal' },
      sections.map((section) =>
        h('a', { key: section.id, className: 'nav-link', href: `#${section.id}` }, section.title)
      )
    ),
    h(
      'button',
      {
        className: 'theme-toggle',
        type: 'button',
        onClick: onToggleTheme,
        'aria-label': 'Cambiar tema'
      },
      theme === 'dark' ? '🌙' : '☀️'
    )
  );

export const Hero = () =>
  h(
    'section',
    { className: 'hero' },
    h('p', { className: 'eyebrow' }, 'Versión nueva · base limpia'),
    h('h1', null, 'Todo tu ecosistema de impresión 3D en ', h('span', null, 'una sola landing')),
    h(
      'p',
      { className: 'hero__copy' },
      'Estructura reiniciada desde cero para evitar mezclas de versiones y mantener el proyecto simple de actualizar.'
    ),
    h(
      'div',
      { className: 'cta-group' },
      h('a', { className: 'btn btn--primary', href: '#filamento' }, 'Ver materiales'),
      h('a', { className: 'btn btn--ghost', href: '#blog' }, 'Ir al blog')
    )
  );

export const QuickSections = ({ sections }) =>
  h(
    'section',
    { className: 'quick-sections' },
    sections.map((section) =>
      h(
        'article',
        { key: section.id, className: 'card card--compact' },
        h('h3', null, section.title),
        h('p', null, section.description),
        h('a', { className: 'card-link', href: `#${section.id}` }, 'Ir a sección')
      )
    )
  );

export const Footer = ({ year }) =>
  h(
    'footer',
    { className: 'site-footer container' },
    h('p', null, `© ${year} 3D Prints by Keiko · Refactor completo de la landing.`)
  );
