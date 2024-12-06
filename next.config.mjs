const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Set-Cookie',
            value: '__vercel_live_token=value; Path=/; Secure; SameSite=None',
          },
        ],
      },
    ];
  },
};

export default nextConfig;