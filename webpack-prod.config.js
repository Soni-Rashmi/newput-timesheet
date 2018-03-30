const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');

module.exports = {
  entry: {
    index: ["./src/index.js"],
    vendor: ["react", "react-dom", "react-router-dom", "babel-polyfill"],
    vendor2: ["react-select", "react-cookies", "react-redux", "query-string", "react-datepicker"],
    vendor3: ["react-easy-chart/lib/bar-chart/index"],
    vendor4: ["react-bootstrap/lib/FormGroup", "react-bootstrap/lib/FormControl", "react-bootstrap/lib/Button", "react-bootstrap/lib/Modal", "react-bootstrap/lib/Tooltip", "react-bootstrap/lib/OverlayTrigger"],
    vendor5: ["redux-form", "react-router", "axios"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/, options: {sourceMap: true} },
      { test: /\.jsx?$/, loader: 'babel-loader', exclude: /node_modules/, options: {sourceMap: true}  },
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
            name: '[path][name].[ext]'
          }
        }
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({filename: './style.css'}),
    new HtmlWebpackPlugin({filename: 'index.html', template: './src/index.html'}),
    new CleanWebpackPlugin(['dist']),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new DuplicatePackageCheckerPlugin({
    verbose: true,
    emitError: true,
  }),
  new webpack.optimize.CommonsChunkPlugin({
     names: ['index', 'vendor', 'vendor2', 'vendor3', 'vendor4', 'vendor5']
   })
  ]
};
