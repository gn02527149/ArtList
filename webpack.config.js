var path = require('path');
var webpack = require('webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");


module.exports = {
    devtool: 'eval',
    watch: true,
    target: 'electron-renderer',
    entry: './src/app',
    output: {
        path: path.join(__dirname, '/build'),
        filename: 'bundle.js',
        publicPath: 'build/'
    },
    module: {
        rules: [
            {
                test: /\.(jsx|js)?$/,
                loader: 'babel-loader',
                options: {
                    presets: [
                    "@babel/preset-env",
                    "@babel/preset-react"]
                }
            },
            {
                test: /\.(scss|css)?$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 8192
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('development'),
                'BROWSER': true
            }
        }),
        new MiniCssExtractPlugin({
            filename: "bundle.css"
        })
    ],

    resolve: {
      extensions: ['.js', '.json', '.jsx']
    }
};
