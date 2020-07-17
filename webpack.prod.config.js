const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    index: path.resolve(__dirname, "./index.js"),
    framework: ["react", "react-dom"],

  },
  mode: "production",
  output: {
    filename: "js/[name].[chunkhash:8].bundle.js"
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: "body",
      minify: {
        removeComments: true,
        collapseWhitespace: true
      }
    })
  ]
};
