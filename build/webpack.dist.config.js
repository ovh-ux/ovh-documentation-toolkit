const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config');

module.exports = merge(baseConfig, {
    mode: "production",
    output: {
        filename: 'ovh-documentation-toolkit.js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        })
    ]
});
