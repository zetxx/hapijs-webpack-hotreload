const Hapi = require('hapi')
const Path = require('path')
var Webpack = require('webpack')
var path = require('path')

const server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, './public')
      }
    }
  }
})
server.connection({ port: 3000 })

server.register(require('inert'),
  (error) => {
    if (error) {
      return console.error(error)
    }
    server.start(() => console.log('Server running at:', server.info.uri))
  })

server.route([{
  method: 'GET',
  path: '/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
}])

var sourceDir = path.join(__dirname, 'app')

const wpc = {
  devtool: 'eval-source-map',
  entry: [
    'react-hot-loader/patch',
    'webpack-hot-middleware/client',
    path.join(sourceDir, 'app.js')
  ],
  resolve: {
    extensions: ['.js']
  },
  output: {
    path: Path.join(__dirname, 'src'),
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

process.nextTick(() => (
  server.register({
    register: require('hapi-webpack-plugin'),
    options: { compiler, assets, hot }
  }, (error) => {
    if (error) {
      return console.error('Hot reload', error)
    }
    return console.error('Hot reload ok')
  })
))
