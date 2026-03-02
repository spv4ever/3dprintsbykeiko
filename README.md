# 3dprintsbykeiko

Landing page estática (sin backend) para mostrar recomendaciones de impresión 3D y enlaces desde redes sociales.

## Requisitos

- Python 3 (para levantar un servidor local rápido)
- Conexión a internet (el proyecto carga React desde CDN `esm.sh` y fuentes de Google Fonts)

## ¿Cómo arrancar el proyecto?

Desde la raíz del repositorio:

```bash
python3 -m http.server 4173
```

Luego abre en tu navegador:

- http://localhost:4173

## Estructura principal

- `index.html`: documento base que monta la app.
- `src/main.js`: punto de entrada que renderiza React.
- `src/App.js`: componente principal de la landing.
- `src/styles.css`: estilos globales, tema claro/oscuro y responsive.

## Despliegue en Hostinger (estático)

1. Sube el contenido del repo (al menos `index.html` y carpeta `src/`) al `public_html`.
2. No necesitas backend ni build step para esta versión.
3. Verifica que `index.html` sea el archivo de entrada en la raíz pública.
