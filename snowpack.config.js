/** @type {import('snowpack').SnowpackUserConfig} */
module.exports = {
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
