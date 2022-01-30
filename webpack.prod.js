const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const TerserPlugin = require("terser-webpack-plugin");
const path = require('path');

module.exports = merge(common, {
    mode: 'production',
    output: {
        filename: 'bunq-fix-csv.webpack.min.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
    ],
    module: {
    },
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin()
        ],
    },
});
