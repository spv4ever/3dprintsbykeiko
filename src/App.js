import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';

const collectionPages = [
  {
    id: 'filamentos',
    title: 'Filamentos usados',
    description: 'Marcas, materiales y colores que utilizo para conseguir acabados fiables y bonitos.',
    intro: 'Filamentos reales que he probado para piezas decorativas y funcionales, ordenados para comparar mejor.',
    details: [
      'Comparativa por material, marca y acabado.',
      'Valoración visual con estrellas para elegir rápido.',
      'Enlaces de referencia para revisar especificaciones.'
    ],
    comingSoon: false
  },
  {
    id: 'accesorios',
    title: 'Accesorios para llaveros, pines y más',
    description: 'Argollas, cadenas, bases y piezas extra que uso para convertir impresiones en productos listos.',
    intro: 'Todos los extras pequeños que hacen que una impresión pase de prototipo a producto final.',
    details: [
      'Tipos de argollas y cadenas según el uso.',
      'Bases y cierres para pines, charms y llaveros.',
      'Ideas para combinar acabados con cada pieza.'
    ],
    comingSoon: false
  },
  {
    id: 'makerworld',
    title: 'Makerworld y diseños recomendados',
    description: 'Mis publicaciones en Makerworld junto con recomendaciones de modelos de otros creadores.',
    intro: 'Una selección de diseños propios y modelos recomendados para imprimir sin complicaciones.',
    details: [
      'Diseños que he publicado y actualizado.',
      'Modelos de otros creadores que recomiendo.',
      'Consejos de impresión para obtener mejores resultados.'
    ],
    comingSoon: false
  },
  {
    id: 'setup',
    title: 'Setup esencial (Próximamente)',
    description: 'Mi selección base para comenzar o mejorar tu estación de impresión. Disponible pronto.',
    intro: 'La base de hardware y herramientas para montar una estación cómoda y eficiente.',
    details: [
      'Impresora, boquillas y superficie recomendada.',
      'Iluminación y organización del espacio de trabajo.',
      'Prioridades de compra si estás empezando.'
    ],
    comingSoon: true
  },
  {
    id: 'calidad',
    title: 'Calidad de impresión (Próximamente)',
    description: 'Productos que uso para obtener capas más limpias y resultados constantes. Disponible pronto.',
    intro: 'Productos y ajustes que ayudan a mejorar consistencia y acabado final.',
    details: [
      'Adhesión de cama y control de warping.',
      'Ajustes clave para reducir defectos visibles.',
      'Checklist rápida antes de imprimir.'
    ],
    comingSoon: true
  },
  {
    id: 'mantenimiento',
    title: 'Mantenimiento y upgrades (Próximamente)',
    description: 'Herramientas y accesorios prácticos para mantener todo al día. Disponible pronto.',
    intro: 'Rutina de mantenimiento y mejoras útiles para alargar la vida de la impresora.',
    details: [
      'Limpieza periódica y revisión de piezas.',
      'Upgrades recomendados por impacto real.',
      'Herramientas básicas para ajustes rápidos.'
    ],
    comingSoon: true
  }
];

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/3dprintsbykeiko/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@3dprints_by_keikodev' },
  { name: 'YouTube', url: 'https://www.youtube.com/@3dprintsbykeikodev' }
];

const mainPages = [
  { id: 'inicio', label: 'Inicio' },
  { id: 'recomendaciones', label: 'Recomendaciones' },
  { id: 'social', label: 'Redes' }
];

const allPageIds = [...mainPages.map((page) => page.id), ...collectionPages.map((page) => page.id)];

const getPreferredTheme = () => {
  const saved = localStorage.getItem('theme');
  if (saved === 'light' || saved === 'dark') return saved;
  return 'dark';
};

const getInitialPage = () => {
  const hash = window.location.hash.replace('#', '');
  return allPageIds.includes(hash) ? hash : 'inicio';
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

  const activeCollection = useMemo(
    () => collectionPages.find((collection) => collection.id === activePage),
    [activePage]
  );

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

  const renderCollectionCards = () =>
    React.createElement(
      'div',
      { className: 'cards-grid cards-grid--collections' },
      collectionPages.map((item) =>
        React.createElement(
          'article',
          { key: item.id, className: 'card' },
          React.createElement('h3', null, item.title),
          React.createElement('p', null, item.description),
          React.createElement(
            'button',
            { type: 'button', className: 'card-link', onClick: () => setActivePage(item.id) },
            'Abrir colección'
          )
        )
      )
    );

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
        mainPages.map((page) =>
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
          React.Fragment,
          null,
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
          React.createElement(
            'section',
            { className: 'links-section page-panel' },
            React.createElement('h2', null, 'Explora mis colecciones'),
            React.createElement(
              'p',
              null,
              'Estas recomendaciones también están en el inicio y cada una tiene su propia subpágina con más detalle.'
            ),
            renderCollectionCards()
          )
        ),
      activePage === 'recomendaciones' &&
        React.createElement(
          'section',
          { className: 'links-section page-panel' },
          React.createElement('h2', null, 'Explora mis colecciones'),
          React.createElement('p', null, 'Cada colección se presenta en su propia página para una navegación más clara.'),
          renderCollectionCards()
        ),
      activeCollection &&
        React.createElement(
          'section',
          { className: 'links-section page-panel' },
          React.createElement(
            'button',
            { type: 'button', className: 'btn btn--ghost back-button', onClick: () => setActivePage('recomendaciones') },
            '← Volver a recomendaciones'
          ),
          React.createElement('h2', null, activeCollection.title),
          React.createElement('p', null, activeCollection.intro),
          activeCollection.comingSoon && React.createElement('p', { className: 'warning' }, 'Sección en preparación. Contenido completo disponible pronto.'),
          React.createElement(
            'ul',
            { className: 'details-list' },
            activeCollection.details.map((detail) => React.createElement('li', { key: detail }, detail))
          ),
          activeCollection.id === 'filamentos' &&
            (filamentsError
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
                ))
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
      React.createElement('p', null, `© ${currentYear} 3D Prints by Keiko. Recomendaciones con enlaces de afiliado.`),
      React.createElement(
        'div',
        { className: 'site-footer__social' },
        socialLinks.map((social) =>
          React.createElement(
            'a',
            {
              key: `footer-${social.name}`,
              href: social.url,
              target: '_blank',
              rel: 'noreferrer'
            },
            social.name
          )
        )
      )
    )
  );
}
