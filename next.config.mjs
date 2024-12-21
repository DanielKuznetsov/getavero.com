const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Access-Control-Allow-Origin',
            value: '*', // Be cautious with this in production
          },
          {
            key: 'Access-Control-Allow-Methods',
            value: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
          },
          {
            key: 'Access-Control-Allow-Headers',
            value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version',
          },
          {
            key: 'Set-Cookie',
            value: '__vercel_live_token=value; Path=/; Secure; SameSite=None',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: '/api/webhooks/clerk/:path*',
        destination: '/api/webhooks/clerk/:path*',
      },
    ];
  },
};

export default nextConfig;

