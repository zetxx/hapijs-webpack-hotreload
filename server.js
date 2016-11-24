const Hapi = require('hapi')
const Path = require('path')
const webpackConfig = require('./config/webpack.config')

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

process.nextTick(() => (
  server.register({
    register: require('hapi-webpack-plugin'),
    options: webpackConfig
  }, (error) => {
    if (error) {
      return console.error('Hot reload', error)
    }
    return console.error('Hot reload ok')
  })
))
