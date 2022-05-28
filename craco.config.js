const CracoLessPlugin = require('craco-less');

/* craco.config.js */
module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1ED760', //포인트컬러
            },
            javascriptEnabled: true,
          },
        },
      },
    },

    {
      plugin: require('craco-plugin-scoped-css'),
    },
  ],
};
