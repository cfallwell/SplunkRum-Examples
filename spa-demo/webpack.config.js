require("ts-node/register/transpile-only");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { SplunkRumWebpackPlugin } = require("@splunk/rum-build-plugins");
const { rumConfig } = require("./src/rum.config.ts");
const { version } = require("./package.json");

if (!rumConfig?.realm || !rumConfig?.applicationName) {
  throw new Error("rumConfig.realm and rumConfig.applicationName are required for source map upload.");
}

const accessToken = process.env.SPLUNK_ORG_ACCESS_TOKEN || process.env.SPLUNK_ACCESS_TOKEN;
if (!accessToken) {
  throw new Error("Set SPLUNK_ORG_ACCESS_TOKEN (or SPLUNK_ACCESS_TOKEN) for source map upload.");
}

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";

  return {
    mode: isProd ? "production" : "development",
    entry: path.resolve(__dirname, "src/main.tsx"),
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "assets/[name].[contenthash].js",
      publicPath: "/",
      clean: true,
    },
    devtool: "source-map", // Required for source map upload
    resolve: {
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          use: {
            loader: "ts-loader",
            options: { transpileOnly: true },
          },
          exclude: /node_modules/,
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "index.html"),
      }),
      new CopyWebpackPlugin({
        patterns: [{ from: path.resolve(__dirname, "public"), to: "" }],
      }),
      new SplunkRumWebpackPlugin({
        applicationName: rumConfig.applicationName,
        version,
        sourceMaps: {
          token: accessToken,
          realm: rumConfig.realm,
          disableUpload: !isProd,
        },
      }),
    ],
    devServer: {
      static: [path.resolve(__dirname, "public"), path.resolve(__dirname, "dist")],
      historyApiFallback: true,
      port: 5173,
      open: true,
    },
  };
};
