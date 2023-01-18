/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  serverRuntimeConfig: {
    baseUrl: "https://dummyjson.com/",
    allProduct: 100,
    baseLimit: 10,
    cartDetailProductsLimit: 5,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.dummyjson.com',
        port: '',
        pathname: '/data/**',
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/products",
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
