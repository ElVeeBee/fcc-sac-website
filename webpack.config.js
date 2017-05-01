const { resolve } = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const cssDev = ['style-loader', 'css-loader', 'sass-loader'];
const cssProd = ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', 'sass-loader'],
                    // publicPath: '/dist'
                })
const cssConfig = isProd ? cssProd : cssDev;

module.exports = {
    entry: './src/scripts/app.js',
    output: {
        path: resolve(__dirname, 'docs'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: cssConfig
            },
            {
                test: /\.pug$/,
                use: ['html-loader','pug-html-loader']
            },
            {
                test: /\.html$/,
                use: 'raw-loader'
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                use: [
                  'file-loader?name=[name][hash:6].[ext]&outputPath=images/',
                  {
                    loader: 'image-webpack-loader', // image compression loader
                    options: {}
                  } 
                ]
            }
        ]
    },
    devServer: {
        contentBase: resolve(__dirname, 'docs'),
        compress: true,
        hot: true,
        stats: 'errors-only',
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Billy's Pomodoro Clock",
            template: './src/docs/index.html',
            hash: true
        }),
        new ExtractTextPlugin({
            filename: '/[name].css',
            disable: !isProd,
            allChunks: true
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NamedModulesPlugin(),
    ]
}