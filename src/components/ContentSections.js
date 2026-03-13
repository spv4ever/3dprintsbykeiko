import React from 'https://esm.sh/react@18.3.1';
import { ExternalLinkButton } from '../utils/link.js';

const h = React.createElement;

const ErrorMessage = ({ message }) => h('p', { className: 'warning' }, message);

const SectionShell = ({ id, title, description, children }) =>
  h(
    'section',
    { className: 'content-block', id },
    h('h2', null, title),
    h('p', { className: 'section-copy' }, description),
    children
  );

export const FilamentSection = ({ state }) =>
  SectionShell({
    id: 'filamento',
    title: '1. Filamento',
    description: 'Recomendaciones de filamentos según uso real y resultados de impresión.',
    children: state.error
      ? ErrorMessage({ message: state.error })
      : h(
          'div',
          { className: 'cards-grid' },
          state.items.map((item) =>
            h(
              'article',
              { className: 'card', key: item.id },
              h('p', { className: 'badge' }, item.clasificacion),
              h('h3', null, item.nombre),
              h('p', null, `${item.marca} · ${item.material} · ${item.color}`),
              h('p', { className: 'muted' }, item.caracteristicas),
              ExternalLinkButton({ href: item.urlProducto || item.urlReferencia, label: 'Ver filamento' })
            )
          )
        )
  });

export const AccessorySection = ({ state }) =>
  SectionShell({
    id: 'accesorios',
    title: '2. Accesorios para creaciones',
    description: 'Elementos extra para finalizar piezas, regalos y productos personalizados.',
    children: state.error
      ? ErrorMessage({ message: state.error })
      : h(
          'div',
          { className: 'cards-grid' },
          state.items.map((item) =>
            h(
              'article',
              { className: 'card', key: item.id },
              h('p', { className: 'badge' }, item.tipo),
              h('h3', null, item.nombre),
              h('p', { className: 'muted' }, item.descripcion),
              ExternalLinkButton({ href: item.url })
            )
          )
        )
  });

export const MakerworldSection = ({ state }) =>
  SectionShell({
    id: 'makerworld',
    title: '3. Contenido MakerWorld',
    description: 'Modelos y publicaciones activas para mostrar catálogo y atraer pedidos.',
    children: state.error
      ? ErrorMessage({ message: state.error })
      : h(
          'div',
          { className: 'cards-grid' },
          state.items.map((item) =>
            h(
              'article',
              { className: 'card', key: item.id },
              h('p', { className: 'badge' }, item.estado),
              h('h3', null, item.titulo),
              h('p', { className: 'muted' }, item.descripcion),
              ExternalLinkButton({ href: item.url, label: 'Abrir en MakerWorld' })
            )
          )
        )
  });

export const BlogSection = ({ state }) =>
  SectionShell({
    id: 'blog',
    title: '4. Blog',
    description: 'Publicaciones rápidas para comunicar progreso, lanzamientos y mejoras.',
    children: state.error
      ? ErrorMessage({ message: state.error })
      : h(
          'div',
          { className: 'cards-grid cards-grid--blog' },
          state.items.map((post) =>
            h(
              'article',
              { className: 'card', key: post.id },
              h('p', { className: 'badge' }, post.fecha),
              h('h3', null, post.titulo),
              h('p', { className: 'muted' }, post.resumen),
              post.url ? ExternalLinkButton({ href: post.url, label: 'Leer entrada completa' }) : null
            )
          )
        )
  });

export const SocialSection = ({ links }) =>
  h(
    'section',
    { className: 'social' },
    h('h2', null, 'Redes'),
    h('p', { className: 'section-copy' }, 'Usa este enlace único en bio para dirigir tráfico a todos tus contenidos.'),
    h(
      'div',
      { className: 'social-links' },
      links.map((social) =>
        h('a', { key: social.name, href: social.url, target: '_blank', rel: 'noreferrer' }, social.name)
      )
    )
  );
