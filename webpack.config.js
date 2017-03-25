const webpack = require('webpack');

var production = (process.env.NODE_ENV === 'production'),
	plugins = [];

if (production) {
	plugins = plugins.concat([
		new webpack.optimize.UglifyJsPlugin({
			mangle: true,
			compress: {
				warnings: false
			}
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
	resolve: {
		extensions: ['.js', '.jsx']
	},
	entry: {
		main: './src/js/tag.js',
		view: './src/js/view.js'
	},
	output: {
		filename: '[name].min.js',
		publicPath: 'dist/js/'
	},
	plugins: [
		new webpack.LoaderOptionsPlugin({
			debug: true
		})
	],
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules\/(?!njp-tag)/,
			loader: 'babel-loader'
		}, {
			test: /\.svg$/,
			loader: 'svg-sprite-loader?' + JSON.stringify({
				name: 'icon-[1]',
				prefixize: true,
				regExp: './img/svg/(.*)\\.svg'
			})
		},{
			test: /\.scss$/,
			loader: 'style-loader!css-loader!sass-loader'
		}]
	}
};

module.exports = config;