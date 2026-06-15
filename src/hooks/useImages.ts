// Importa todas las imágenes de perfil y proyectos en build-time de Vite
const perfilModules = import.meta.glob('/src/assets/images/profile/*.{png,jpg,jpeg,webp}', { eager: true });
const projectModules = import.meta.glob('/src/assets/images/proyecto-*/*.{png,jpg,jpeg,webp}', { eager: true });

function extractUrl(mod: unknown): string | null {
  if (mod && typeof mod === 'object' && 'default' in mod) {
    return (mod as { default: string }).default;
  }
  return null;
}

export function useProfileImage(): string | null {
  const paths = Object.keys(perfilModules);
  if (paths.length === 0) return null;
  // Prioridad: png > jpg > jpeg > webp
  const priority = ['.png', '.jpg', '.jpeg', '.webp'];
  const sorted = paths.sort((a, b) => {
    const extA = priority.findIndex((ext) => a.toLowerCase().endsWith(ext));
    const extB = priority.findIndex((ext) => b.toLowerCase().endsWith(ext));
    return extA - extB;
  });
  return extractUrl(perfilModules[sorted[0]]);
}

export function useProjectImages(projectName: string): string[] {
  const prefix = `/src/assets/images/proyecto-${projectName}/`;
  const urls = Object.keys(projectModules)
    .filter((path) => path.startsWith(prefix))
    .map((path) => extractUrl(projectModules[path]))
    .filter((url): url is string => url !== null);
  // Ordenar alfabéticamente para consistencia
  return urls.sort();
}
