const { merge } = require("webpack-merge")
const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")
const common = require("./webpack.common.js")
const webpack = require("webpack")
const dotenv = require("dotenv")

dotenv.config()

module.exports = merge(common, {
  mode: "development",
  entry: {
    index: "./src/index.tsx"
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Shadowingly",
      template: path.resolve(__dirname, "./src/index.html")
    }),
    new webpack.DefinePlugin({
      "process.env.TATOEBA_BASE_URL": JSON.stringify(process.env.TATOEBA_BASE_URL)
    })
  ],
  devtool: "inline-source-map",
  devServer: {
    static: "./dist",
    open: true,
    hot: true
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true
  },
  optimization: {
    runtimeChunk: "single"
  }
})
