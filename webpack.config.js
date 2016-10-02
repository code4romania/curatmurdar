'use strict';

var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	devtool: 'eval-source-map',

	entry: __dirname + '/app/scripts.js',
	output: {
		path: __dirname + '/build',
		filename: 'bundle.js'
	},

	module: {
		loaders: [
			{
				test: /\.json$/,
				loader: 'json'
			},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel'
			},
			{
				test: /\.css$/,
				loader: 'style!css!postcss'
			},
			{
				test: /\.scss$/,
				loader: 'style!css!postcss!sass'
			}
		]
	},

	postcss: [
		require('autoprefixer')
	],

	plugins: [
		new webpack.BannerPlugin('Copyright notice'),
		new HtmlWebpackPlugin({
			template: __dirname + '/app/index.html'
		}),
		new webpack.HotModuleReplacementPlugin()
	],

	devServer: {
		contentBase: './public',
		colors: true,
		historyApiFallback: true,
		inline: true,
		hot: true
	}
}
