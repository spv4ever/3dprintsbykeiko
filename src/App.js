import React, { useEffect, useMemo, useState } from 'https://esm.sh/react@18.3.1';

const featuredLinks = [
  {
    title: 'Filamentos usados',
    description: 'Marcas, materiales y colores que utilizo para conseguir acabados fiables y bonitos.'
  },
  {
    title: 'Accesorios para llaveros, pines y más',
    description: 'Argollas, cadenas, bases y piezas extra que uso para convertir impresiones en productos listos.'
  },
  {
    title: 'Makerworld y diseños recomendados',
    description: 'Mis publicaciones en Makerworld junto con recomendaciones de modelos de otros creadores.'
  },
  {
    title: 'Setup esencial (Próximamente)',
    description: 'Mi selección base para comenzar o mejorar tu estación de impresión. Disponible pronto.'
  },
  {
    title: 'Calidad de impresión (Próximamente)',
    description: 'Productos que uso para obtener capas más limpias y resultados constantes. Disponible pronto.'
  },
  {
    title: 'Mantenimiento y upgrades (Próximamente)',
    description: 'Herramientas y accesorios prácticos para mantener todo al día. Disponible pronto.'
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
        { id: 'filamentos', className: 'links-section container' },
        React.createElement('h2', null, 'Filamentos recomendados'),
        React.createElement(
          'p',
          null,
          'Selección personal por categoría para que compares material, uso y acceso a la ficha de producto oficial.'
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
                  React.createElement('p', { className: 'product-card__badge' }, filament.clasificacion),
                  React.createElement('h3', null, filament.nombre),
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
