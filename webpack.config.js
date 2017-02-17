const path = require('path');

module.exports = {
    entry: './src/ColorPicker.js',

    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/, //RegExp
            exclude: /node_modules/,
            query: {
                presets: ['es2015']
            }
        }]
    }
};