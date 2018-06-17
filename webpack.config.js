const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: __dirname + '/dist',
    filename: 'js/[hash]-main.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: ['css-loader?-autoprefixer&sourceMap=true&importLoaders=1', 'postcss-loader']
        })
      },
      {
        test: /\.ico$\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
       },
      {
        test: /\.svg$/,
        loader: 'svg-url-loader'
      },
      {
        test: /\fragments\/.*\.ejs$/,
        loader: 'ejs-html-loader',
      },
      //{ test: /\.(png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.(jp(e*)g)$/,
        use: [{
            loader: 'url-loader',
            options: {
              limit: 50000, // Convert images < 8kb to base64 strings
              name: 'images/[hash]-[name].[ext]'
            }
        }]
      },{
        test: /\.png$/,
        use: [{
          loader: 'url-loader?mimetype=image/png',
          options: {
            limit: 50000, // Convert images < 8kb to base64 strings
            name: 'images/[hash]-[name].[ext]',
          },
        }],
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new HtmlWebpackPlugin({
      template: './src/index.template.ejs',
      inject: 'body',
      interpolate: true,
      favicon: './src/img/favicon.ico',
    }),
    new ExtractTextPlugin("css/[hash]-main.css"),
    new UglifyJsPlugin(),
    new CopyWebpackPlugin([{
      from: './src/.htaccess',
      to: '.htaccess',
      toType: 'file'
    }])
  ],
};
