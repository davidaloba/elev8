module.exports = {
  // async redirects () {
  //   return [
  //     process.env.MAINTENANCE_MODE === true
  //       ? {
  //           source: '/((?!maintenance|_next).*)',
  //           destination: '/maintenance',
  //           permanent: false
  //         }
  //       : null
  //   ].filter(Boolean)
  // },
  // async redirects () {
  //   return [
  //     {
  //       source: '/((?!maintenance|_next).*)',
  //       destination: '/maintenance',
  //       permanent: false
  //     }
  //   ]
  // },
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    // !! WARN !!
    // Dangerously allow postion builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true
  },
  eslint: {
    dirs: ['./src', './test']
  }

}
