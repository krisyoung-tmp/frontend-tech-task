const webpack = require('webpack')
const withSass = require('@zeit/next-sass')

module.exports = withSass({
    publicRuntimeConfig: {
        apiEndpoint: process.env.API_URL,
    },
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 2,
        localIdentName: '[path][name]__[local]--[hash:base64:5]',
        hashPrefix: 'my-custom-hash',
    },
})
