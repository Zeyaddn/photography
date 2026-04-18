/** @type {import('next').NextConfig} */
const nextConfig = {
  // Security headers to optimize Best Practices score to 100
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self';",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval' cdn.jsdelivr.net;",
              "style-src 'self' 'unsafe-inline' fonts.googleapis.com cdn.jsdelivr.net;",
              "img-src 'self' data: blob: https:;", // Corrected: Allow all HTTPS images
              "font-src 'self' fonts.gstatic.com data:;",
              "connect-src 'self' https:;",
              "frame-src 'self' https://www.youtube.com;",
              "base-uri 'self';",
              "form-action 'self';",
              "frame-ancestors 'none';"
            ].join(' ')
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000; includeSubDomains; preload'
          }
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'res.cloudinary.com' },
    ],
  },
};

module.exports = nextConfig;
