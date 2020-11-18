const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const resolve = (p) => path.resolve(__dirname, `./${p}`);

const files = ["ie", "ie_lodash", "ie_polyfill"];

module.exports = {
  mode: "production",
  entry: () => {
    let output = {};

    files.forEach((file) => {
      output[file] = resolve(`${file}.js`);
    });
    return output;
  },
  output: {
    filename: "[name].bundle.js",
    path: resolve("dist"),
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { useBuiltIns: "entry", corejs: 2 }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...files.map(
      (file) =>
        new HtmlWebpackPlugin({
          title: `${file}`,
          filename: `${file}.html`,
          chunks: [`${file}`],
        })
    ),
  ],
  optimization: {
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      }),
    ],
  },
};
