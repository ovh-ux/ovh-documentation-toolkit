import LodashModuleReplacementPlugin from 'lodash-webpack-plugin'
import formatter from 'eslint-friendly-formatter'
import path from 'path'
import webpack from 'webpack'

const exclude = [/node_modules/, /dist/]

export default {
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
    new LodashModuleReplacementPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ],
  module: {
    rules: [
      { test: /\.js$/,
        enforce: 'pre',
        exclude,
        use: [
          { loader: 'eslint-loader',
            options: {
              formatter
            } }
        ] },
      { test: /\.js$/,
        exclude,
        use: [
          'ng-annotate-loader',
          'babel-loader'
        ] },
      { test: /\.(html|svg)$/,
        exclude,
        use: [
          { loader: 'html-loader',
            options: {
              interpolate: true,
              minimize: true
            } }
        ] }
    ]
  }
}
