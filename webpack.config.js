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
		new ProgressBarPlugin(),
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			minChunks: Infinity
		})
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
	resolve: {
		extensions: ['.js', '.jsx']
	},
	entry: {
		vendor: [
			'react',
			'redux',
			'react-redux',
			'react-dom',
			'interact.js',
			'promise',
			'superagent',
			'superagent-promise'
		],
		main: './src/js/tag.js',
		view: './src/js/view.js'
	},
	output: {
		filename: '[name].min.js',
		publicPath: 'dist/js/'
	},
	plugins: plugins,
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