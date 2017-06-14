import webpack from 'webpack'
import merge from 'webpack-merge'
import baseConfig from './webpack.base.config'

export default merge(baseConfig, {
  output: {
    filename: 'ovh-documentation-toolkit.js'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': process.env.NODE_ENV
    })
  ]
})
