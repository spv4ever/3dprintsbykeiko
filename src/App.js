import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';

const featuredLinks = [
  {
    id: 'filamentos',
    title: 'Filamentos usados',
    description: 'Marcas, materiales y colores que utilizo para conseguir acabados fiables y bonitos.'
  },
  {
    id: 'accesorios',
    title: 'Accesorios para llaveros, pines y más',
    description: 'Argollas, cadenas, bases y piezas extra que uso para convertir impresiones en productos listos.'
  },
  {
    id: 'makerworld',
    title: 'Makerworld y diseños recomendados',
    description: 'Mis publicaciones en Makerworld junto con recomendaciones de modelos de otros creadores.'
  },
  {
    id: 'setup',
    title: 'Setup esencial (Próximamente)',
    description: 'Mi selección base para comenzar o mejorar tu estación de impresión. Disponible pronto.'
  },
  {
    id: 'calidad',
    title: 'Calidad de impresión (Próximamente)',
    description: 'Productos que uso para obtener capas más limpias y resultados constantes. Disponible pronto.'
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento y upgrades (Próximamente)',
    description: 'Herramientas y accesorios prácticos para mantener todo al día. Disponible pronto.'
  }
];

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/3dprintsbykeiko/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@3dprints_by_keikodev' },
  { name: 'YouTube', url: 'https://www.youtube.com/@3dprintsbykeikodev' }
];

const pages = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'recomendaciones', label: 'Recomendaciones' },
  { id: 'filamentos', label: 'Filamentos' },
  { id: 'social', label: 'Redes' }
];

const getPreferredTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
};

const getInitialPage = () => {
  const hash = window.location.hash.replace('#', '');
  return pages.some((page) => page.id === hash) ? hash : 'inicio';
};

const renderStars = (rating = 0) => {
  const safeRating = Math.max(0, Math.min(5, Number(rating) || 0));
  return '★'.repeat(safeRating) + '☆'.repeat(5 - safeRating);
};

export function App() {
  const [theme, setTheme] = useState(getPreferredTheme);
  const [activePage, setActivePage] = useState(getInitialPage);
  const [filaments, setFilaments] = useState([]);
  const [filamentsError, setFilamentsError] = useState('');
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  useEffect(() => {
    const jsonUrl = new URL('./data/filaments.json', import.meta.url);

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error('No se pudo cargar el listado de filamentos.');
        }
        return response.json();
      })
      .then((data) => setFilaments(Array.isArray(data) ? data : []))
      .catch(() => setFilamentsError('No hemos podido cargar esta sección por ahora.'));
  }, []);

  useEffect(() => {
    window.location.hash = activePage;
  }, [activePage]);

  return React.createElement(
    React.Fragment,
    null,
    React.createElement('div', { className: 'bg-decoration', 'aria-hidden': 'true' }),
    React.createElement(
      'header',
      { className: 'site-header container' },
      React.createElement(
        'a',
        {
          className: 'brand',
          href: '#inicio',
          onClick: () => setActivePage('inicio'),
          'aria-label': 'Inicio 3D Prints by Keiko'
        },
        React.createElement('span', { className: 'brand__logo' }, '3D'),
        React.createElement('span', { className: 'brand__name' }, 'Prints by Keiko')
      ),
      React.createElement(
        'nav',
        { className: 'main-nav', 'aria-label': 'Navegación principal' },
        pages.map((page) =>
          React.createElement(
            'button',
            {
              key: page.id,
              type: 'button',
              className: page.id === activePage ? 'nav-link nav-link--active' : 'nav-link',
              onClick: () => setActivePage(page.id)
            },
            page.label
          )
        )
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
      { className: 'container page-content' },
      activePage === 'inicio' &&
        React.createElement(
          'section',
          { className: 'hero page-panel' },
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
            'Ahora cada sección está organizada como una página independiente para que navegues más fácil por mis recomendaciones.'
          ),
          React.createElement(
            'div',
            { className: 'cta-group' },
            React.createElement(
              'button',
              { className: 'btn btn--primary', type: 'button', onClick: () => setActivePage('recomendaciones') },
              'Ver recomendaciones'
            ),
            React.createElement(
              'button',
              { className: 'btn btn--ghost', type: 'button', onClick: () => setActivePage('social') },
              'Ir a redes'
            )
          )
        ),
      activePage === 'recomendaciones' &&
        React.createElement(
          'section',
          { className: 'links-section page-panel' },
          React.createElement('h2', null, 'Explora mis colecciones'),
          React.createElement('p', null, 'Cada colección se presenta en su propia página para una navegación más clara.'),
          React.createElement(
            'div',
            { className: 'cards-grid' },
            featuredLinks.map((item) =>
              React.createElement(
                'article',
                { key: item.title, className: 'card' },
                React.createElement('h3', null, item.title),
                React.createElement('p', null, item.description),
                React.createElement('button', { type: 'button', className: 'card-link', onClick: () => setActivePage(item.id === 'filamentos' ? 'filamentos' : 'recomendaciones') }, 'Abrir colección')
              )
            )
          )
        ),
      activePage === 'filamentos' &&
        React.createElement(
          'section',
          { className: 'links-section page-panel' },
          React.createElement('h2', null, 'Filamentos recomendados'),
          React.createElement(
            'p',
            null,
            'Cada ficha incluye puntuación con estrellas, opción de imagen y se muestra una por fila para compararlas mejor.'
          ),
          filamentsError
            ? React.createElement('p', { className: 'warning' }, filamentsError)
            : React.createElement(
                'div',
                { className: 'cards-grid cards-grid--filaments' },
                filaments.map((filament) =>
                  React.createElement(
                    'article',
                    { key: filament.id, className: 'card product-card' },
                    filament.imagen
                      ? React.createElement('img', {
                          className: 'product-card__image',
                          src: filament.imagen,
                          alt: `Imagen de ${filament.nombre}`,
                          loading: 'lazy'
                        })
                      : React.createElement('div', { className: 'product-card__image-placeholder' }, 'Sin imagen disponible'),
                    React.createElement('p', { className: 'product-card__badge' }, filament.clasificacion),
                    React.createElement('h3', null, filament.nombre),
                    React.createElement(
                      'p',
                      { className: 'product-card__rating', 'aria-label': `${filament.puntuacion || 0} de 5 estrellas` },
                      renderStars(filament.puntuacion),
                      React.createElement('span', null, ` ${filament.puntuacion || 0}/5`)
                    ),
                    React.createElement(
                      'ul',
                      { className: 'product-card__meta' },
                      React.createElement('li', null, React.createElement('strong', null, 'Marca: '), filament.marca),
                      React.createElement('li', null, React.createElement('strong', null, 'Material: '), filament.material),
                      React.createElement('li', null, React.createElement('strong', null, 'Diámetro: '), filament.diametro),
                      React.createElement('li', null, React.createElement('strong', null, 'Color: '), filament.color),
                      React.createElement('li', null, React.createElement('strong', null, 'Uso recomendado: '), filament.uso)
                    ),
                    React.createElement(
                      'div',
                      { className: 'product-card__actions' },
                      React.createElement(
                        'a',
                        { href: filament.urlReferencia, target: '_blank', rel: 'noreferrer' },
                        'Web de referencia'
                      ),
                      React.createElement(
                        'a',
                        { href: filament.urlProducto, target: '_blank', rel: 'noreferrer' },
                        'Ficha de producto'
                      )
                    )
                  )
                )
              )
        ),
      activePage === 'social' &&
        React.createElement(
          'section',
          { className: 'social page-panel' },
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
