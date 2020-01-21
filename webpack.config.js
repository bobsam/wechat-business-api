const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const fs = require('fs');

module.exports = {
	entry: {
		bundle: ["babel-polyfill", "./views/appClient.tsx"]
	},
	output: {
		filename: 'js/bundle.js',
		path: __dirname + '/public'
	},

	// Enable sourcemaps for debugging webpack's output.
	devtool: 'source-map',

	resolve: {
		// Add '.ts' and '.tsx' as resolvable extensions.
		extensions: ['.ts', '.tsx', '.js', '.json', '.css']
	},

	module: {
		rules: [
			{
				test: /\.css$/,
				use: ExtractTextPlugin.extract({
				  use: [{
					loader: "css-loader",
					options: { importLoaders: 1 }
				  }, {
					loader: "postcss-loader"
				  }],
				  fallback: 'style-loader'
				})
			},
			// All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
			{ test: /\.tsx?$/, 
				use : {
					loader: 'awesome-typescript-loader',
					options : {
						useBabel : true,
					}
				}
			},
			// 专门配置一个babel-loader来编译koa-cola，因为koa-cola的ts编译的选项是ES2017，原因是服务器端使用不经过编译的async/awai
			{
				test: /\.jsx?$/,
				use: {
					loader: 'babel-loader?babelrc=true'
				},
				exclude: /node_modules\/(?!(koa-cola)|(controller-decorators)\/).*/,
			},

			// All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
			{ enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
		]
	},

	plugins: [
		new ExtractTextPlugin({
			allChunks: true,
			disable: false,
			filename: 'css/[name].css'
		}),

		new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /zh-cn/),

		new webpack.optimize.CommonsChunkPlugin({
			name: "vendor",
			minChunks: module => /node_modules/.test(module.resource)
		}),

		new webpack.IgnorePlugin(/koa$/),
		new webpack.IgnorePlugin(/koa-body$/),
		
		function () {
			this.plugin("done", function (stats) {
				var assetsByName = stats.toJson().assetsByChunkName;
				var packageJson = require("./package.json");
				packageJson.dist = {
					bundleJs: assetsByName.bundle,
					vendorJs: assetsByName.vendor
				};
				console.log(JSON.stringify(stats.toJson().assetsByName));
				console.log(packageJson.dist);
				//写入packageJson
				fs.writeFileSync('./package.json', JSON.stringify(packageJson, null, 4), 'utf-8');
			});
		}
	]
};