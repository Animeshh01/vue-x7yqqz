import { resolve } from 'path';
import fs from 'fs';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import VueLoaderPlugin from 'vue-loader/lib/plugin';
import TerserPlugin from 'terser-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";

export const entry={
app: './src/app.js',
mgmt: ['./src/modules/mgmt/mgmt.js'],
login: './src/modules/login/login.js'
};
export const output={
path: resolve(__dirname,'dist'),
// publicPath: '/ahezime/',
filename: (chunkData) => {
console.log('chuckData.chunk.name => ',chunkData.chunk.name);
return chunkData.chunk.name==='app'? './[name].bundle.js':'./[name]/[name].bundle.js';
}
};
export const optimization={
minimizer: [
new TerserPlugin(),
new OptimizeCSSAssetsPlugin({})
]
};
export const plugins=[
new MiniCssExtractPlugin({
filename: "[name].css",
chunkFilename: "[id].css"
}),
new CleanWebpackPlugin(['dist']),
new VueLoaderPlugin(),
new HtmlWebpackPlugin({
title: 'app',
template: './src/app.html',
// inject: false,
chunks: ['app'],
filename: './index.html'
}),
new HtmlWebpackPlugin({
title: 'mgmt',
template: './src/modules/mgmt/mgmt.html',
// inject: false,
chunks: ['mgmt'],
filename: './mgmt/index.html'
}),
new HtmlWebpackPlugin({
title: 'login',
template: './src/modules/login/login.html',
// inject: false,
chunks: ['login'],
filename: './login/index.html'
})
];
export const module={
rules: [
{
test: /\.m?js$/,
exclude: /(node_modules|bower_components)/,
use: {
loader: 'babel-loader',
options: {
presets: ['@babel/preset-env'],
plugins: ['@babel/plugin-proposal-object-rest-spread']
}
}
}
],
rules: [
{
test: /\.vue$/,
exclude: /node_modules/,
loader: 'vue-loader'
},
{
test: /\.css$/,
use: [
'vue-style-loader',
'style-loader',
'css-loader',
'sass-loader'
]
},
{
test: /\.scss?$/,
use: ['style-loader','css-loader','sass-loader']
},
{
test: /\.(png|svg|jpg|gif)$/,
use: [
'file-loader'
]
},
{
test: /\.(woff|woff2|eot|ttf|otf)$/,
use: [
'file-loader'
]
}
]
};