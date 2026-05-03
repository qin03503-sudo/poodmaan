module.exports = {
  reactStrictMode: true,
  swcMinify: true,
  
  // Environment variables exposed to the browser
  env: {
    customEnv: process.env.CUSTOM_ENV,
  },
  
  // Internal API proxy to avoid CORS
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE_URL}/api/:path*`,
      },
      {
        source: '/auth/:path*',
        destination: `${process.env.AUTH_SERVICE_URL}/:path*`,
      },
    ]
  },
  
  // Headers for security
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
  
  // Image domains for external images
  images: {
    domains: ['localhost', 'cdn.podcast-platform.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: '**.cloudfront.net',
      },
    ],
  },
  
  // Webpack config for shared packages
  webpack: (config, { isServer }) => {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@packages': require('path').resolve(__dirname, '../packages'),
    }
    return config
  },
  
  // Experimental features
  experimental: {
    serverActions: true,
    typedRoutes: true,
  },
}
