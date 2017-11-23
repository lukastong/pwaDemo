const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

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
	  }
    ]
  },
  plugins: [
    new webpack.BannerPlugin('lukastong github ©copyright'),
	new HtmlWebpackPlugin({
	  template: __dirname + "/src/index.tmpl.html"//new 一个这个插件的实例，并传入相关的参数
	}),
	new webpack.HotModuleReplacementPlugin()//热加载插件
  ],
};
