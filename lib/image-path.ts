export function getImagePath(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  return cleanPath;
}
