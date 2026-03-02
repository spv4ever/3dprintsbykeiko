import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';

const featuredLinks = [
  {
    title: 'Setup esencial',
    description: 'Mi selección base para comenzar o mejorar tu estación de impresión.'
  },
  {
    title: 'Calidad de impresión',
    description: 'Productos que uso para obtener capas más limpias y resultados constantes.'
  },
  {
    title: 'Mantenimiento y upgrades',
    description: 'Herramientas y accesorios prácticos para mantener todo al día.'
  }
];

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/3dprintsbykeiko/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@3dprints_by_keikodev' },
  { name: 'YouTube', url: 'https://www.youtube.com/@3dprintsbykeikodev' }
];

const getPreferredTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
};

export function App() {
  const [theme, setTheme] = useState(getPreferredTheme);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('div', { className: 'bg-decoration', 'aria-hidden': 'true' }),
    React.createElement(
      'header',
      { className: 'site-header container' },
      React.createElement(
        'a',
        { className: 'brand', href: '#', 'aria-label': 'Inicio 3D Prints by Keiko' },
        React.createElement('span', { className: 'brand__logo' }, '3D'),
        React.createElement('span', { className: 'brand__name' }, 'Prints by Keiko')
      ),
      React.createElement(
        'button',
        {
          className: 'theme-toggle',
          type: 'button',
          onClick: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
          'aria-label': 'Cambiar tema'
        },
        React.createElement('span', { 'aria-hidden': 'true' }, theme === 'dark' ? '🌙' : '☀️'),
        React.createElement('span', null, theme === 'dark' ? 'Modo oscuro' : 'Modo claro')
      )
    ),
    React.createElement(
      'main',
      null,
      React.createElement(
        'section',
        { className: 'hero container' },
        React.createElement('p', { className: 'eyebrow' }, 'Recomendaciones reales'),
        React.createElement(
          'h1',
          null,
          'Lo que realmente uso para',
          React.createElement('span', null, ' impresión 3D')
        ),
        React.createElement(
          'p',
          { className: 'hero__copy' },
          'Esta página reúne los productos y accesorios que he probado personalmente para imprimir mejor, trabajar más cómodo y optimizar resultados en el día a día.'
        ),
        React.createElement(
          'div',
          { className: 'cta-group' },
          React.createElement('a', { className: 'btn btn--primary', href: '#recomendaciones' }, 'Ver recomendaciones'),
          React.createElement('a', { className: 'btn btn--ghost', href: '#social' }, 'Ir a redes')
        )
      ),
      React.createElement(
        'section',
        { id: 'recomendaciones', className: 'links-section container' },
        React.createElement('h2', null, 'Explora mis colecciones'),
        React.createElement('p', null, 'Selecciona una categoría para abrir la lista de productos recomendados.'),
        React.createElement(
          'div',
          { className: 'cards-grid' },
          featuredLinks.map((item) =>
            React.createElement(
              'article',
              { key: item.title, className: 'card' },
              React.createElement('h3', null, item.title),
              React.createElement('p', null, item.description),
              React.createElement('a', { href: '#' }, 'Abrir colección')
            )
          )
        )
      ),
      React.createElement(
        'section',
        { id: 'social', className: 'social container' },
        React.createElement('h2', null, 'Sígueme para más contenido'),
        React.createElement(
          'div',
          { className: 'social-links' },
          socialLinks.map((social) =>
            React.createElement(
              'a',
              {
                key: social.name,
                href: social.url,
                'aria-label': social.name,
                target: '_blank',
                rel: 'noreferrer'
              },
              social.name
            )
          )
        )
      )
    ),
    React.createElement(
      'footer',
      { className: 'site-footer container' },
      React.createElement('p', null, `© ${currentYear} 3D Prints by Keiko. Recomendaciones con enlaces de afiliado.`)
    )
  );
}
