const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const webpack = require('webpack');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    entry: "./src/web/index.tsx",
    output: {
        path: path.resolve(__dirname, '../public/mypage'),
        // filename: "[name]-[hash].bundle.js",
        filename: "[name].bundle.js",
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
            }
        ]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: 'HOME',
            template: './src/web/index.html'
        }),
        // new copyWebpackPlugin({patterns: [{from: './src/style', to: "style"}, {from: './src/static'}]}),
    ],
    devServer: {
        host: 'localhost',
        port: 8080,

        // 「/api」を別サーバーへ転送する設定
        proxy: {
            '/__': {
                target: 'http://localhost:5000/'
            }
        }
    },
};
