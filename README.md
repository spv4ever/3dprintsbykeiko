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

## Subida a producción en Hostinger (paso a paso)

### 1) Verifica localmente antes de subir

```bash
python3 -m http.server 4173
```

- Revisa que cargue bien en móvil y escritorio.
- Confirma que el toggle de tema funciona.
- Comprueba que no hay rutas rotas (`src/main.js`, `src/styles.css`, etc.).

### 2) Prepara archivos a publicar

Para esta versión estática (sin build), solo necesitas:

- `index.html`
- carpeta `src/` completa

Opcional pero recomendado:

- `favicon` e imágenes optimizadas si luego agregas assets.

### 3) Sube archivos al hosting

En Hostinger tienes dos opciones:

- **File Manager** (hPanel)
- **FTP/SFTP** (FileZilla u otro cliente)

Ruta objetivo:

- `public_html/`

Acción:

- Sube `index.html` y `src/` dentro de `public_html`.
- Si ya existe un sitio anterior, haz backup y reemplaza archivos.

### 4) Configura dominio y SSL

- Apunta el dominio a Hostinger (si aún no está apuntado).
- Activa el certificado SSL desde hPanel.
- Fuerza HTTPS para evitar contenido mixto y mejorar confianza.

### 5) Limpia caché y valida en vivo

- Limpia caché del navegador.
- Si usas CDN o caché de Hostinger, purga caché.
- Abre tu dominio en modo incógnito y valida:
  - carga inicial,
  - diseño responsive,
  - links de recomendaciones,
  - links de redes.

### 6) Checklist final de producción

- `index.html` está en la raíz de `public_html`.
- `src/main.js`, `src/App.js` y `src/styles.css` cargan con código 200.
- SSL activo (candado en navegador).
- Página funcional en móvil.
- Copia de seguridad guardada del despliegue anterior.

## Actualizaciones futuras (workflow recomendado)

1. Edita localmente.
2. Prueba con `python3 -m http.server 4173`.
3. Sube cambios a `public_html`.
4. Purga caché y valida de nuevo en incógnito.
