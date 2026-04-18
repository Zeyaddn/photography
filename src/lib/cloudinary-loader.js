'use client';

/**
 * Cloudinary custom image loader for next/image.
 * Routes all images through Cloudinary Fetch CDN for automatic
 * WebP/AVIF conversion, resizing, and global CDN delivery.
 *
 * @param {object} params
 * @param {string} params.src - Original image URL
 * @param {number} params.width - Requested width
 * @param {number} [params.quality] - Requested quality (1-100)
 * @returns {string} Cloudinary fetch URL
 */
export default function cloudinaryLoader({ src, width, quality }) {
  const CLOUD_NAME = 'dma99iya8';
  const params = [`f_auto`, `q_${quality || 'auto'}`, `w_${width}`];
  const paramsString = params.join(',');
  
  // If src is already a full URL, use Cloudinary fetch
  if (src.startsWith('http')) {
    return `https://res.cloudinary.com/${CLOUD_NAME}/image/fetch/${paramsString}/${src}`;
  }
  
  // For local/relative paths, return as-is (fallback)
  return src;
}
