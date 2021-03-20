module.exports = {
  async redirects() {
    return [
      {
        source: '/blog/posts',
        destination: '/blog',
        permanent: true
      },
      {
        source: '/blog/posts/:slug',
        destination: '/blog/:slug',
        permanent: true,
      },
    ]
  }
}
