# 3dprintsbykeiko

Landing estática para centralizar recomendaciones y contenido de impresión 3D en un único enlace.

## Refactor 2026

Se reinició la estructura del frontend para evitar mezcla de versiones:

- Arquitectura modular por `config`, `hooks`, `components` y `utils`.
- Carga de contenido desde JSON centralizada en un solo hook.
- Tema oscuro/claro gestionado con hook dedicado.
- UI y estilos reconstruidos desde cero con una base más consistente.

## Contenido editable

El contenido sigue viviendo en `src/data/`:

- `src/data/filaments.json`
- `src/data/accessories.json`
- `src/data/makerworld.json`
- `src/data/blog.json`

## Ejecutar localmente

```bash
python3 -m http.server 4173
```

Abrir en navegador:

- http://localhost:4173

## Estructura principal

- `index.html`: documento base.
- `src/main.js`: arranque de React.
- `src/App.js`: composición principal de la landing.
- `src/config/siteConfig.js`: configuración de secciones y archivos de datos.
- `src/hooks/*`: hooks de tema y contenido.
- `src/components/*`: layout y secciones de contenido.
- `src/styles.css`: estilos globales.
