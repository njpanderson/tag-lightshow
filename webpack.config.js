const webpack = require('webpack'),
	ProgressBarPlugin = require('progress-bar-webpack-plugin'),
	WebpackNotifierPlugin = require('webpack-notifier');

var production = (process.env.NODE_ENV === 'production'),
	plugins = [
		new WebpackNotifierPlugin({
			alwaysNotify: true
		}),
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),
		new ProgressBarPlugin()
	];

if (production) {
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			sourceMap: true
		}),
	]);
} else {
	plugins = plugins.concat([
		new webpack.LoaderOptionsPlugin({
			debug: true
		})
	]);
}

var config = {
	devtool: production ? 'source-map' : 'inline-source-map',
	cache: !production,
	entry: {
		main: './src/js/tag.js',
		view: './src/js/view.js'
	},
	output: {
		filename: '[name].min.js',
		publicPath: 'dist/js/'
	},
	plugins: plugins,
	module: {
		// rules: [{
		// 	test: /\.js$/,
		// 	exclude: /node_modules/,
		// 	loader: 'babel-loader'
		// }]
	}
};

module.exports = config;