const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
module.exports = ({ env }) => {
  return {
    entry: {
      app: path.join(__dirname, "src", "index.tsx"),
    },
    target: "web",
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    // Where files should be sent once they are bundled
    output: {
      path: path.join(__dirname, "/dist"),
      filename: "index.bundle.js",
      clean: true,
    },
    // webpack 5 comes with devServer which loads in development mode
    devServer: {
      port: 3000,
      watchContentBase: true,
    },
    // Rules of how webpack will take our files, complie & bundle them for the browser
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /nodeModules/,
          use: {
            loader: "babel-loader",
            options: {
              plugins: ["react-hot-loader/babel"],
            },
          },
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },
        {
          test: /\.less$/,
          use: [
            {
              loader: "style-loader"
            },
            {
              loader: "css-loader",
              options: {
                sourceMap: true,
                modules: true,
                localIdentName: "[local]___[hash:base64:5]"
              }
            },
            {
              loader: "less-loader"
            }
          ]
        }
      ],
    },
    plugins: [
      new Dotenv({
        path: `./environments/.env.${env}`,
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/index.html",
      }),
    ],
    devServer: {
      hot: true,
    },
  };
};
