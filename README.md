# 3dprintsbykeiko

Landing page estática (sin backend) para compartir, desde un único enlace, todo el contenido principal de impresión 3D.

## Enfoque actual

La web está planteada como **una sola página** optimizada para tráfico desde redes y organizada por bloques:

1. Filamento.
2. Accesorios para creaciones.
3. Contenido MakerWorld.
4. Blog (entradas rápidas).

## Mantenimiento fácil (sin tocar diseño)

El contenido editable vive en `src/data/`:

- `src/data/filaments.json`
- `src/data/accessories.json`
- `src/data/makerworld.json`
- `src/data/blog.json`

Para actualizar productos o enlaces solo modifica esos JSON.

## Requisitos

- Python 3
- Conexión a internet (React se carga desde `esm.sh`)

## ¿Cómo arrancar el proyecto?

Desde la raíz del repositorio:

```bash
python3 -m http.server 4173
```

Abrir:

- http://localhost:4173

## Estructura principal

- `index.html`: documento base.
- `src/main.js`: renderizado de React.
- `src/App.js`: landing de una sola página.
- `src/styles.css`: estilos y responsive.
- `src/data/*.json`: contenido editable.

## Si no ves cambios en localhost

Si el navegador muestra una versión antigua:

1. Arranca el servidor desde la raíz del repo (`/workspace/3dprintsbykeiko`).
2. Haz recarga forzada (Ctrl+F5 o Cmd+Shift+R).
3. Prueba en ventana incógnito para descartar caché.
4. Verifica que abre exactamente `http://localhost:4173`.

También se añadió versionado en `index.html` para forzar la recarga de `src/main.js` y `src/styles.css`.
