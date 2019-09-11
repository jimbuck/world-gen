const withCSS = require('@zeit/next-css');

module.exports = withCSS({
    // Required to work with GitHub pages.
    assetPrefix: process.env.NODE_ENV === 'production' ? '/world-gen' : '',
});