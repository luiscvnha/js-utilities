const path = require("path");

/** @type {import("webpack").Configuration} */
const config = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    filename: "index.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
    globalObject: "this",
    library: {
      name: "jsUtilities",
      type: "umd",
      umdNamedDefine: true,
    },
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            configFile: "tsconfig.src.json",
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
};

module.exports = config;
