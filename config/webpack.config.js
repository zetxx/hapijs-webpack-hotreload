var Webpack = require('webpack')
var path = require('path')

var sourceDir = path.join(path.dirname(require.main.filename), 'app')

const wpc = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(sourceDir, 'app.js')
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
  output: {
    path: path.join(__dirname, 'src'),
    filename: 'index.js',
    publicPath: '/src/'
  },
  plugins: [
    new Webpack.optimize.OccurrenceOrderPlugin(),
    new Webpack.NoErrorsPlugin(),
    new Webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loaders: [
        'babel-loader'
      ],
      include: sourceDir
    }, {
      test: /.*\.(gif|png|jpe?g|svg)$/i, loaders: ['url-loader?limit=30720000']
    }, {
      test: /\.css$/,
      loaders: [
        'style-loader?sourceMap',
        'css-loader?modules&importLoaders=1&localIdentName=[path]___[name]__[local]___[hash:base64:5]',
        'postcss-loader'
      ]
    }]
  }
}

const compiler = new Webpack(wpc)

const assets = {
  publicPath: wpc.output.publicPath,
  noInfo: true,
  watchOptions: {
    aggregateTimeout: 300,
    poll: true,
    watch: true
  },
  stats: {
    colors: true
  }
}

const hot = {
  publicPath: wpc.output.publicPath,
  reload: true
}

module.exports = {compiler, assets, hot}
