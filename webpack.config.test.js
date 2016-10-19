var path = require('path');

module.exports = {
    entry: './test/test.js',
    output: {
        path: path.join(__dirname, 'test'),
        filename: 'test.bundle.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    }
};