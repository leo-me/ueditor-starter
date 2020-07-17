const path = require("path");
// 动态生成html文件，自动生成js的src
const HtmlWebpackPlugin = require("html-webpack-plugin");
// 删除之前的打包js文件
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// 压缩js
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
// 打包css文件
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// css 压缩
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./index.js"),
    framework: ["react", "react-dom"],
  },
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "[name].[hash:8].bundle.js",
    library: '[name]_[chunkhash]_library'
  },
  module: {
    rules: [
      //   {
      //     test: /\.jsx?$/,
      //     loaders: ["babel-loader?presets[]=es2015,presets[]=react"]
      //   }
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        include: [/ueditor/],
        use: ['style-loader', "css-loader"]
      },
      {
        test: /\.less$/,
        use: ["file-loader", {
          loader: "css-loader",
          options: {
            modules: true
          }
        }, {
          loader: "less-loader",
          options: {
            modules: true
          }
        }]
      },
      // {
      //   test: /\.(sass|scss)$/,
      //   use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"]
      // },
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        include: [/ueditor/],
        loader: 'url-loader',
        options: {
            esModule: false,
            limit: 10000,
            name: '[name].[ext]'
            // name:  path.resolve(__dirname, "./images/[name].[ext]"),
        }
      },
      {
        test: /\.(html)$/,
        include: [/ueditor\/dialogs/],
        // exclude: paths.appSrc + '/pages/edit/ueditor',
        use: [
            require.resolve('extract-loader'),
            require.resolve('html-loader')
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      // 这里有小伙伴可能会疑惑为什么不是 '../public/index.html'
      // 我的理解是无论与要用的template是不是在一个目录，都是从根路径开始查找
      template: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "css/[name].[hash].css",
      chunkFilename: "css/[id].[hash].css"
    })
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin(),
      new OptimizeCssAssetsPlugin({
        assetNameRegExp: /\.css$/g,
        cssProcessor: require("cssnano"),
        cssProcessorPluginOptions: {
          preset: ["default", { discardComments: { removeAll: true } }]
        },
        canPrint: true
      })
    ],
    splitChunks: {
      chunks: "all",
      minSize: 30000,
      maxSize: 0,
      minChunks: 1,
      cacheGroups: {
        framework: {
          test: "framework",
          name: "framework",
          enforce: true
        },
        vendors: {
          priority: -10,
          test: /node_modules/,
          name: "vendor",
          enforce: true
        }
      }
    }
  },
  resolve: {
    alias: {

    }
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./dist"),
    open: true,
    port: 9002,
    compress: true,
    hot: true
  },
  devtool: "cheap-module-eval-source-map"
};
