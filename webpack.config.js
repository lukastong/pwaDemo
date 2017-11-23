const path = require('path');
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  devtool: 'eval-source-map',
  entry:  __dirname + "/src/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  devServer: {
    contentBase: "./public",//本地服务器所加载的页面所在的目录
    historyApiFallback: true,//不跳转
    inline: true,
    hot: true//实时刷新
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
		loader: "babel-loader",
		options: {
		  presets: [
			"es2015", "react"
		  ]
		}
		},
            exclude: /node_modules/
      },
      {
		test: /\.css$/,
		  use: [
			{
			  loader: "style-loader"
			},

			{
			  loader: "css-loader",
			  options: {
			  	modules: true
			  }
			},
			{
              loader: "postcss-loader",
              options: {
			  	modules: true
			  }
            },
		  ]
	  },
    {
      test: /\.(png|jpg|gif|icon|ico)$/,
      include: path.join(__dirname, 'src'),
      exclude: /node_modules/,
      loader: 'url-loader',
    },
    ]
  },
  plugins: [
    new webpack.BannerPlugin('lukastong github ©copyright'),
    new CopyWebpackPlugin([
      {from: 'src/manifest.json', to: path.join(__dirname, 'public')},
      {from: 'src/sw.js', to: path.join(__dirname, 'public')},
      {from: 'src/serviceworker-cache-polyfill.js', to: path.join(__dirname, 'public')},
	  {from: 'src/images', to: path.join(__dirname, 'public/images')},

      ],{
      	ignore: ['.DS_Store'],
      }),
	new HtmlWebpackPlugin({
	  template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
	}),
	new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
};
