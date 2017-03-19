var config = require('./webpack.config.js');

config.entry = './src/js/app/Index.jsx';

config.output = {
	path: __dirname,
	filename: 'webpack-temp.js'
};

module.exports = config;