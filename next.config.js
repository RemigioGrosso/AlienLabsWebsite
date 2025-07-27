/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true,
    domains: [
      'pbs.twimg.com',
      'abs.twimg.com',
      'scontent.cdninstagram.com',
      'media.licdn.com',
      'i.ytimg.com',
      'yt3.ggpht.com'
    ],
  },
  // Disable server-side features for static export
  experimental: {
    esmExternals: false
  }
}

module.exports = nextConfig