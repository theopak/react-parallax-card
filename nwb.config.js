module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactParallaxCard',
      externals: {
        react: 'React'
      }
    }
  },
  babel: {
    plugins: [
      "styled-jsx/babel"
    ]
  },
  webpack: {
    html: {
      template: 'demo/src/index.html'
    }
  }
}
