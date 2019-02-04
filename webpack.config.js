const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/js/main.js',
    output:{
		path: `${__dirname}/dist/js/`,
		publicPath: '/js/',
        filename: 'main.js'
    },
    devServer: {
		contentBase: path.join(__dirname, '/dist/'),
		compress: true,
        open: true,
		port: 9000,
		host: '0.0.0.0',
		disableHostCheck: true
	},
	module: {
		rules: [
			{
				test: /\.(glsl|vs|fs)$/,
				loader: 'shader-loader',
				options: {
					glsl: {
						chunkPath: path.resolve("/glsl/chunks")
					}
				}
			}
		]
	}
}

