const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const OptimizeCssAssetsPlugin = require("css-minimizer-webpack-plugin");
const webpack = require("webpack");
const TerserWebpackPlugin = require("terser-webpack-plugin");

module.exports = function (env, argv) {
  const isProduction = argv.mode === "production";
  const isDevelopment = !isProduction;
  return {
    mode: "development",
    entry: "/src/index.jsx", // main js
    output: {
      path: path.resolve(__dirname, "dist"), // output folder
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.js$|\.jsx?$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              cacheDirectory: true,
              cacheCompression: false,
              envName: isProduction ? "production" : "development",
              presets: ["@babel/preset-env", "@babel/preset-react"],
            },
          },
        },
        {
          test: /\.css|\.s[ac]ss$/i,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
      ],
    },
    resolve: {
      extensions: [".js", ".jsx"],
    },
    plugins: [
      new CopyPlugin({
        patterns: [
          {
            from: "./src/assets",
            to: "assets",
          },
        ],
      }),
      new HtmlWebpackPlugin({
        template: "./src/index.html", // base html
      }),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify(
          isProduction ? "production" : "development"
        ),
      }),
    ],
    optimization: {
      minimize: isProduction,
      minimizer: [
        new TerserWebpackPlugin({
          terserOptions: {
            compress: {
              comparisons: false,
            },
            mangle: {
              safari10: true,
            },
            output: {
              comments: false,
              ascii_only: true,
            },
            warnings: false,
          },
        }),
        new OptimizeCssAssetsPlugin(),
      ],
    },
    devServer: {
      proxy: [
        {
          context: ["/api"],
          target: "http://localhost:3004",
          pathRewrite: { "^/api": "" },
        },
      ],
      compress: true,
      historyApiFallback: true,
      open: true,
    },
  };
};
