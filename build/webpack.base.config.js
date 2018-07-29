const path = require("path");
const nodeExternals = require("webpack-node-externals");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");

const translateEnvToMode = (env) => {
  if (env === "production") {
    return "production";
  }
  return "development";
};

module.exports = env => {
  return {
    target: "electron-renderer",
    mode: translateEnvToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: [".ts", ".tsx", ".json", ".js", ".jsx"],
      alias: {
        env: path.resolve(__dirname, `../config/env_${env}.json`)
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        },
        {
          test: /\.(gif|svg|jpg|png)$/,
          loader: "file-loader",
        }
      ]
    },
    plugins: [
      new FriendlyErrorsWebpackPlugin({ clearConsole: env === "development" })
    ]
  };
};
