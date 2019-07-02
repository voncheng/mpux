'use strict';
var webpack = require('webpack');
const path = require('path');
const UglifyJsPlugin=require('uglifyjs-webpack-plugin');

const config = {
  mode:"production",
  context: path.resolve(__dirname, 'publish/'),
  entry: './index.js',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'index.js',
    libraryTarget: "commonjs2",
    library: "mpux" 
  },
  //压缩js
  optimization: {
    minimizer: [
        new UglifyJsPlugin({
            uglifyOptions: {
              compress: {
                // 删除所有的 `console` 语句，可以兼容ie浏览器
                drop_console: true,
              },
              output: {
                beautify: false,
                comments: false,
              }
            }
        })
      ]
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin()
  ],
  // resolve: {
  //   modules: [path.resolve(__dirname, 'node_modules')],
  // },
};

module.exports = config;
