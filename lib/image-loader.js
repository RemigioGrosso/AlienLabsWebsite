/**
 * Custom image loader to ensure all images are loaded over HTTPS
 * This prevents mixed content warnings by forcing HTTPS for all image sources
 */
export default function imageLoader({ src, width, quality }) {
  // If the src is already HTTPS, return as is
  if (src.startsWith('https://')) {
    return src;
  }
  
  // If the src is HTTP, convert to HTTPS
  if (src.startsWith('http://')) {
    return src.replace('http://', 'https://');
  }
  
  // Handle protocol-relative URLs
  if (src.startsWith('//')) {
    return `https:${src}`;
  }
  
  // If it's a relative path or data URL, return as is
  if (src.startsWith('/') || src.startsWith('data:')) {
    return src;
  }
  
  // For any other case, assume it needs HTTPS prefix
  return `https://${src}`;
}