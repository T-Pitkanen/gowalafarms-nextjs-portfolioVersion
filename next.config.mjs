const nextConfig = {  
    reactStrictMode: false,
    experimental: {
      serverComponentsExternalPackages: ["mongoose"],
      serverActions: {
        // edit: updated to new key. Was previously `allowedForwardedHosts`
        allowedOrigins: ['gowalafarms.webmcdm.dk'],
        allowedForwardedHosts: ['gowalafarms.webmcdm.dk'],
      },
    },
    webpack: function (config, options) {
      config.experiments = {
        ...config.experiments,
        layers: true,
        topLevelAwait: true,
      };
      return config;
    },
    images: {
      minimumCacheTTL: 10,
      remotePatterns: [
        {
          protocol: 'https',
          hostname: '*',
          port: '',
          pathname: '/**',
        },
        {
          protocol: 'http',
          hostname: '*',
          port: '',
          pathname: '/**',
        },
      ],
    }
  }
  
export default nextConfig