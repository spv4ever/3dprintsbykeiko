import React from 'https://esm.sh/react@18.3.1';

const h = React.createElement;

export const ExternalLinkButton = ({ href, label = 'Abrir enlace', variant = 'primary' }) =>
  h(
    'a',
    {
      className: `btn btn--${variant}`,
      href,
      target: '_blank',
      rel: 'noreferrer'
    },
    label
  );
