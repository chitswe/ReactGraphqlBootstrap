var webpack = require('webpack');
module.exports = {
    entry: {
        admin: ['react-hot-loader/patch','./client/admin/browser.js'],
        site:['react-hot-loader/patch','./client/site/browser.js']
    },
    module: {
        loaders: [{
            test: /\.js?$/,
            exclude: /node_modules/,
            loaders: ["react-hot-loader/webpack","babel-loader"]
        }
        ]
    },
    resolve: {
        extensions: ['', '.js']
    },
    output: {
        path: './public',
        filename: '[name].bundle.js'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devtool: 'source-map'
};

