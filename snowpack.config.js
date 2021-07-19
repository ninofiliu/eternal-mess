/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
  exclude: [
    'node_modules/**/*',
    'in/**/*',
  ],
  mount: {
    public: {
      url: '/',
      static: true,
    },
    in: {
      url: '/in',
      static: true,
      resolve: false,
    },
    src: {
      url: '/dist',
    },
  },
  plugins: [
    '@snowpack/plugin-typescript',
  ],
};
