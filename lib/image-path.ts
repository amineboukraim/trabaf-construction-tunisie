export function getImagePath(src: string): string {
  if (!src) return '';
  if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
    return src;
  }
  const basePath = '/trabaf-construction-tunisie';
  if (src.startsWith(basePath)) return src;
  const cleanPath = src.startsWith('/') ? src : `/${src}`;
  return `${basePath}${cleanPath}`;
}
