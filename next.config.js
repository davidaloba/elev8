module.exports = {
  reactStrictMode: true,
  images: { domains: ['res.cloudinary.com'] },
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    // ignoreBuildErrors: true,
  }
}
