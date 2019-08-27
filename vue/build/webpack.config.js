
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin')
const VuePlugin = require('vue-loader/lib/plugin')

function resolve (dir) {
  return path.resolve(__dirname, '..', dir)
}

module.exports = {
  mode: process.env.NODE_ENV,
  entry: {
    app: resolve('src/app')
  },
  output: {
    filename: '[name].js',
    path: resolve('dist'),
    publicPath: '/'
  },
  resolve: {
    alias: {
      '@': resolve('src')
    },
    extensions: ['.js', '.styl']
  },
  module: {
    rules: [
      {
        test: /\.styl(us)?$/,
        use: [
          // { loader: MiniCssExtractPlugin.loader },
          { loader: 'style-loader'},
          { loader: 'css-loader', options: {sourceMap: true} },
          {
            loader: 'postcss-loader', options: {
              sourceMap: true,
              plugins: [
                require("autoprefixer")
              ]
            }
          },
          { loader: 'stylus-loader', options: {sourceMap: true} }
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader'},
          { loader: 'css-loader', options: {sourceMap: true} }
        ]
      },
      // {
      //   test: /\.js$/,
      //   loader: 'babel-loader',
      //   include: [resolve('src')]
      // },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        include: [resolve('src')]
      },
      {
        test: /\.(png|jpg(e)?|gif|svg|woff|tty|eot|ttf)/,
        loader: 'url-loader',
        options: {
          limit: 8190
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: resolve('index.html'),
      title: 'index',
      // favicon: resolve('src/assets/img/logo.png')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
      }
    }),
    new MiniCssExtractPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyPlugin([
      {
        from: resolve('static'),
        to: 'static'
      }
    ]),
    new VuePlugin()
  ],
  optimization: {
    minimize: true || false,
    removeEmptyChunks: true,
    mergeDuplicateChunks: true,
    runtimeChunk: {
      name: 'runtime'
    },
    splitChunks: {
      chunks: 'all',
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      maxAsyncRequests: 3,
      maxInitialRequests: 5,
      cacheGroups: {
        verson: {
          test: /[\\/]node_modules[\\/]/,
          priority: 10
        }
      }
    }
  },
  devServer: {
    hot: true,
    host: '0.0.0.0',
    open: true,
    useLocalIp: true,

    clientLogLevel: 'warning',
    overlay: {
      warnings: true,
      error: true
    },
    inline: true,
    progress: true,
    // onInfo: true,
    // quiet: true
  }
}
