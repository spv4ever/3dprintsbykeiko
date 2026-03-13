import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';

const h = React.createElement;

const sections = [
  { id: 'filamento', title: 'Filamento recomendado', description: 'Marcas y materiales reales que uso para vender y regalar impresiones.' },
  { id: 'accesorios', title: 'Accesorios para creaciones', description: 'Piezas extra para convertir impresiones en productos listos para entregar.' },
  { id: 'makerworld', title: 'Contenido en MakerWorld', description: 'Modelos propios y recomendaciones para descargar e imprimir rápido.' },
  { id: 'blog', title: 'Blog', description: 'Entradas cortas para compartir avances, ajustes y novedades.' }
];

const socialLinks = [
  { name: 'Instagram', url: 'https://www.instagram.com/3dprintsbykeiko/' },
  { name: 'TikTok', url: 'https://www.tiktok.com/@3dprints_by_keikodev' },
  { name: 'YouTube', url: 'https://www.youtube.com/@3dprintsbykeikodev' }
];

const getPreferredTheme = () => {
  const saved = localStorage.getItem('theme');
  return saved === 'light' || saved === 'dark' ? saved : 'dark';
};

const useContent = (fileName) => {
  const [items, setItems] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const jsonUrl = new URL(`./data/${fileName}`, import.meta.url);

    fetch(jsonUrl)
      .then((response) => {
        if (!response.ok) throw new Error('Error cargando contenido');
        return response.json();
      })
      .then((data) => setItems(Array.isArray(data) ? data : []))
      .catch(() => setError('No se pudo cargar esta sección.'));
  }, [fileName]);

  return { items, error };
};

const renderExternalLink = (item, text = 'Abrir enlace') =>
  h(
    'a',
    {
      className: 'btn btn--primary',
      href: item.url,
      target: '_blank',
      rel: 'noreferrer'
    },
    text
  );

export function App() {
  const [theme, setTheme] = useState(getPreferredTheme);
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  const filamento = useContent('filaments.json');
  const accesorios = useContent('accessories.json');
  const makerworld = useContent('makerworld.json');
  const blog = useContent('blog.json');

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return h(
    React.Fragment,
    null,
    h('div', { className: 'bg-decoration', 'aria-hidden': 'true' }),
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
        sections.map((section) => h('a', { key: section.id, className: 'nav-link', href: `#${section.id}` }, section.title))
      ),
      h(
        'button',
        {
          className: 'theme-toggle',
          type: 'button',
          onClick: () => setTheme((prev) => (prev === 'dark' ? 'light' : 'dark')),
          'aria-label': 'Cambiar tema'
        },
        h('span', { 'aria-hidden': 'true' }, theme === 'dark' ? '🌙' : '☀️')
      )
    ),
    h(
      'main',
      { className: 'container page-content', id: 'inicio' },
      h(
        'section',
        { className: 'hero' },
        h('p', { className: 'eyebrow' }, 'Landing única para redes'),
        h('h1', null, 'Todo mi contenido de impresión 3D en ', h('span', null, 'una sola página')),
        h(
          'p',
          { className: 'hero__copy' },
          'Diseñada para acceso rápido desde Instagram, TikTok o YouTube. Puedes mantener y actualizar los enlaces editando archivos JSON sin tocar el diseño.'
        ),
        h(
          'div',
          { className: 'cta-group' },
          h('a', { className: 'btn btn--primary', href: '#filamento' }, 'Ver materiales'),
          h('a', { className: 'btn btn--ghost', href: '#blog' }, 'Ir al blog')
        )
      ),
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
      ),
      h(
        'section',
        { className: 'content-block', id: 'filamento' },
        h('h2', null, '1. Filamento'),
        h('p', { className: 'section-copy' }, 'Recomendaciones de filamentos con valoración, usos y enlace directo.'),
        filamento.error
          ? h('p', { className: 'warning' }, filamento.error)
          : h(
              'div',
              { className: 'cards-grid' },
              filamento.items.map((item) =>
                h(
                  'article',
                  { className: 'card', key: item.id },
                  h('p', { className: 'badge' }, item.clasificacion),
                  h('h3', null, item.nombre),
                  h('p', null, `${item.marca} · ${item.material} · ${item.color}`),
                  h('p', { className: 'muted' }, item.caracteristicas),
                  renderExternalLink({ url: item.urlProducto || item.urlReferencia }, 'Ver filamento')
                )
              )
            )
      ),
      h(
        'section',
        { className: 'content-block', id: 'accesorios' },
        h('h2', null, '2. Accesorios para creaciones'),
        h('p', { className: 'section-copy' }, 'Argollas, cadenas, imanes y extras que uso para terminar piezas.'),
        accesorios.error
          ? h('p', { className: 'warning' }, accesorios.error)
          : h(
              'div',
              { className: 'cards-grid' },
              accesorios.items.map((item) =>
                h(
                  'article',
                  { className: 'card', key: item.id },
                  h('p', { className: 'badge' }, item.tipo),
                  h('h3', null, item.nombre),
                  h('p', { className: 'muted' }, item.descripcion),
                  renderExternalLink(item)
                )
              )
            )
      ),
      h(
        'section',
        { className: 'content-block', id: 'makerworld' },
        h('h2', null, '3. Contenido MakerWorld'),
        h('p', { className: 'section-copy' }, 'Publicaciones y colecciones para descargar directo desde MakerWorld.'),
        makerworld.error
          ? h('p', { className: 'warning' }, makerworld.error)
          : h(
              'div',
              { className: 'cards-grid' },
              makerworld.items.map((item) =>
                h(
                  'article',
                  { className: 'card', key: item.id },
                  h('p', { className: 'badge' }, item.estado),
                  h('h3', null, item.titulo),
                  h('p', { className: 'muted' }, item.descripcion),
                  renderExternalLink(item, 'Abrir en MakerWorld')
                )
              )
            )
      ),
      h(
        'section',
        { className: 'content-block', id: 'blog' },
        h('h2', null, 'Blog'),
        h('p', { className: 'section-copy' }, 'Entradas breves para compartir novedades y tips sin cambiar la estructura de la landing.'),
        blog.error
          ? h('p', { className: 'warning' }, blog.error)
          : h(
              'div',
              { className: 'cards-grid cards-grid--blog' },
              blog.items.map((post) =>
                h(
                  'article',
                  { className: 'card', key: post.id },
                  h('p', { className: 'badge' }, post.fecha),
                  h('h3', null, post.titulo),
                  h('p', { className: 'muted' }, post.resumen),
                  post.url && renderExternalLink({ url: post.url }, 'Leer entrada completa')
                )
              )
            )
      ),
      h(
        'section',
        { className: 'social' },
        h('h2', null, 'Redes'),
        h('p', { className: 'section-copy' }, 'Comparte este enlace único en tus bios y dirige tráfico a todas tus recomendaciones.'),
        h(
          'div',
          { className: 'social-links' },
          socialLinks.map((social) => h('a', { key: social.name, href: social.url, target: '_blank', rel: 'noreferrer' }, social.name))
        )
      )
    ),
    h(
      'footer',
      { className: 'site-footer container' },
      h('p', null, `© ${currentYear} 3D Prints by Keiko · Landing optimizada para tráfico social.`)
    )
  );
}
