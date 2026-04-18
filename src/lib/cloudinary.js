/**
 * Cloudinary helper for regular <img> tags (non-next/image).
 * Wraps any image URL through Cloudinary Fetch CDN.
 *
 * @param {string} src - Original image URL
 * @param {object} [options]
 * @param {number} [options.width] - Desired width
 * @param {number} [options.quality] - Quality (1-100)
 * @param {string} [options.format] - Format (auto, webp, avif)
 * @returns {string} Cloudinary fetch URL
 */
export function getCloudinaryUrl(src, options = {}) {
  const CLOUD_NAME = 'dma99iya8';
  const { width, quality = 'auto', format = 'auto' } = options;
  
  const params = [`f_${format}`, `q_${quality}`];
  if (width) params.push(`w_${width}`);
  
  const paramsString = params.join(',');
  
  if (src.startsWith('http')) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${paramsString}/${src}`;
  }
  
  return src;
}
