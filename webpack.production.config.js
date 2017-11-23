const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry:  __dirname + "/src/main.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle-[hash].js"
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
	new webpack.HotModuleReplacementPlugin(),//热加载插件
	new webpack.optimize.UglifyJsPlugin({
	    output: {
	      comments: false,
	    },
	    compressor: {
	      sequences: false,     // join consecutive statemets with the “comma operator”
	      properties: false,    // optimize property access: a['foo'] → a.foo
	      dead_code: false,     // discard unreachable code
	      drop_debugger: true,  // discard “debugger” statements
	      unsafe: false,        // some unsafe optimizations (see below)
	      conditionals: true,   // optimize if-s and conditional expressions
	      comparisons: true,    // optimize comparisons
	      evaluate: false,      // evaluate constant expressions
	      booleans: true,       // optimize boolean expressions
	      loops: true,          // optimize loops
	      unused: true,         // drop unused variables/functions
	      hoist_funs: true,     // hoist function declarations
	      hoist_vars: true,     // hoist variable declarations
	      if_return: true,      // optimize if-s followed by return/continue
	      join_vars: true,      // join var declarations
	      cascade: false,       // try to cascade `right` into `left` in sequences
	      side_effects: false,  // drop side-effect-free statements
	      warnings: true,       // warn about potentially dangerous optimizations/code
	      global_defs: {},      // global definitions
	    },
	  })
  ],
};
