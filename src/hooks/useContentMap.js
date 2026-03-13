import { useEffect, useState } from 'https://esm.sh/react@18.3.1';

const emptyState = { items: [], error: '' };

const toSectionState = (data) =>
  Object.fromEntries(
    Object.keys(data).map((key) => [key, { ...emptyState }])
  );

export const useContentMap = (fileMap) => {
  const [content, setContent] = useState(toSectionState(fileMap));

  useEffect(() => {
    const controllers = [];

    Object.entries(fileMap).forEach(([key, fileName]) => {
      const controller = new AbortController();
      controllers.push(controller);

      fetch(new URL(`../data/${fileName}`, import.meta.url), { signal: controller.signal })
        .then((response) => {
          if (!response.ok) {
            throw new Error('Error cargando contenido');
          }
          return response.json();
        })
        .then((data) => {
          setContent((current) => ({
            ...current,
            [key]: {
              items: Array.isArray(data) ? data : [],
              error: ''
            }
          }));
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            return;
          }

          setContent((current) => ({
            ...current,
            [key]: {
              items: [],
              error: 'No se pudo cargar esta sección.'
            }
          }));
        });
    });

    return () => {
      controllers.forEach((controller) => controller.abort());
    };
  }, [fileMap]);

  return content;
};
