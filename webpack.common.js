const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        filename: 'bunq-fix-csv.webpack.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
        ]
    },
    plugins: [
    ],
};