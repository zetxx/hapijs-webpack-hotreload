const Hapi = require('hapi');
const Path = require('path');
var Webpack = require('webpack');
var WebpackPlugin = require('hapi-webpack-plugin');

const server = new Hapi.Server({
    connections: {
        routes: {
            files: {
                relativeTo: Path.join(__dirname, './public')
            }
        }
    }
});
server.connection({port: 3000});

server.register(require('inert'),
    (error) => {
        if (error) {
            return console.error(error);
        }
        server.start(() => console.log('Server running at:', server.info.uri));
    });

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
}]);
// ///////////////////////////////WP///webpack registration should be on last step !!!!
const wpc = {
    entry: ['babel-polyfill', 'webpack-hot-middleware/client', './app/app.js'],
    output: {
        path: Path.join(__dirname, 'src'),
        filename: 'index.js',
        publicPath: '/src/'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loader: 'babel',
            query: {
                presets: ['es2015', 'stage-0', 'react', 'react-hmre']
            }
        }]
    },
    plugins: [
        new Webpack.HotModuleReplacementPlugin(),
        new Webpack.NoErrorsPlugin()
    ]
};

const compiler = new Webpack(wpc);

const assets = {
    publicPath: wpc.output.publicPath,
    noInfo: true,
    quiet: true,
    stats: {
        colors: true
    }
};

const hot = {
    publicPath: wpc.output.publicPath,
    reload: true
};

server.register({
    register: WebpackPlugin,
    options: { compiler, assets, hot }
}, (error) => {
    if (error) {
        return console.error('Hot reload', error);
    }
    return console.error('Hot reload ok');
});
