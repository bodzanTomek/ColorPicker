const path = require('path');

module.exports = {
    entry: ['babel-polyfill', './src/main.js'],

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    }
};