const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin  =require('extract-text-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const precss = require('precss');
const autoprefixer = require('autoprefixer');
// const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');


module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    inline: true,
    // colors: true,
    // historyApiFallback: true,
    hot: true,
    port: 8001
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + '/server/index.tmpl.html'
    }),
    // new CleanWebpackPlugin(['dist']),
    // 热更新
    new webpack.HotModuleReplacementPlugin(),
    // 允许错误不打断程序, 仅开发模式需要
    // new webpack.NoErrorsPlugin(), 
    // css打包
    new MiniCssExtractPlugin({ filename: 'styles.css'}),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.(jpg|png|svg|gif)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        exclude: /node_modules/,
        loader: 'file-loader',
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loader: 'less-loader',
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['es2015', 'react']
          }
        }
      },
      {
        test: /\.json$/,
        exclude: /node_modules/,
        loader: 'json-loader'
      }
    ]
  },
  // mode: 'development',
  // eslint: {
  //   configFile: __dirname + '/.eslintrc.js',
  // }
};

// 