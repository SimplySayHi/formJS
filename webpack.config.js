
const webpack = require('webpack');
const path = require('path');

/*
 * We've enabled UglifyJSPlugin for you! This minifies your app
 * in order to load faster and run less javascript.
 *
 * https://github.com/webpack-contrib/uglifyjs-webpack-plugin
 *
 */

const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

module.exports = [{
	entry: './src/index',
	output: {
		filename: 'formjs.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			}
		]
	},
	optimization: {
		minimize: false,
		namedModules: true,
		namedChunks: true
	},
	plugins: [
		new UglifyJSPlugin({
			uglifyOptions: {
				compress: false,
				mangle: false,
				output: {
					beautify: '-b',
					comments: /^\**!|@preserve|@license|@cc_on/i
				}
			}
		})
	]
},
{
	entry: './src/index',
	output: {
		filename: 'formjs.min.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',

				options: {
					presets: ['env']
				}
			}
		]
	},
    // for test:    eval-source-map
    // for deploy:  hidden-source-map or source-map
	devtool: 'source-map',
	plugins: [
		new UglifyJSPlugin({
			sourceMap: true,
			uglifyOptions: {
				output: {
					comments: /^\**!|@preserve|@license|@cc_on/i
				}
			}
		})
	]
}];
