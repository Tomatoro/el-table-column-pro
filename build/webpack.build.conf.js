'use strict'
const path = require('path')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

const webpackConfig = {
  entry: {
    'element.elTablePro.common': './src/plugin/el-table-pro/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  // mode: 'production',
  externals: [{
    vue: 'Vue',
    'element-ui': 'ELEMENT'
  }],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          preserveWhitespace: false
        }
        // options: vueLoaderConfig
      },
      {
        test: /\.(jsx?|babel|es6)$/,
        // exclude: /(node_modules|bower_components)/,
        include: process.cwd(),
        exclude: /node_modules|utils\/popper\.js|utils\/date\.js/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: { // 这里的options选项参数可以定义多大的图片转换为base64
            limit: 50000, // 表示小于50kb的图片转为base64,大于50kb的是路径
            outputPath: 'images' //定义输出的图片文件夹
          }
        }]
      }
    ]
  },
  plugins: [
    // 请确保引入这个插件来施展魔法
    // new VueLoaderPlugin()
    new UglifyJsPlugin()
  ]
}

module.exports = webpackConfig
