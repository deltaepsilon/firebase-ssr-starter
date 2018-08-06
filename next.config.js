const StatsPlugin = require('stats-webpack-plugin');
const withCss = require('@zeit/next-css');
const withSourceMaps = require('@zeit/next-source-maps');

module.exports = withSourceMaps(
  withCss({
    webpack(config, options) {
      config.profile = true;
      config.plugins.push(new StatsPlugin('stats.json'));
      config.stats = 'verbose';
      return config;
    },
  })
);
