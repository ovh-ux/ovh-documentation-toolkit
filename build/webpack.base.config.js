const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
const formatter = require('eslint-friendly-formatter');
const path = require('path');
const webpack = require('webpack');

const exclude = [/node_modules/, /dist/]

module.exports = {
    entry: {
        component: ['./src/app/index.js']
    },
    output: {
        path: path.resolve('.', 'dist'),
        filename: '[name].js',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            src: path.resolve('.', 'src'),
            build: path.resolve(__dirname)
        }
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': process.env.NODE_ENV
        }),
        new webpack.NoEmitOnErrorsPlugin,
        new LodashModuleReplacementPlugin({
            shorthands: true,
            collections: true,
            paths: true
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                enforce: 'pre',
                exclude,
                use: [
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(html|svg)$/,
                exclude,
                use: [
                    {
                        loader: 'html-loader',
                        options: {
                            interpolate: true,
                            minimize: true
                        }
                    }
                ]
            }
        ]
    }
};
