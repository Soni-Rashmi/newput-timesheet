const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  entry: ["./src/index.js"],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "bundle.js"
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      { test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader']
        })
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use:  {
          loader : 'file-loader',
          options: {
            name: "images/[name].[ext]"
          }
        }
      }
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
    new HtmlWebpackPlugin({filename: 'index.html', template: './public/index.html'}),
    new CleanWebpackPlugin(['dist'])
  ]
};
