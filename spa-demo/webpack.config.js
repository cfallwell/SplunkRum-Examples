require("ts-node/register/transpile-only");
const path = require("node:path");
path.default = path;
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { SplunkRumWebpackPlugin } = require("@splunk/rum-build-plugins");
const { rumConfig } = require("./src/rum.config.ts");
const { version } = require("./package.json");

class EnsureOutputPathPlugin {
  apply(compiler) {
    if (!compiler.outputPath && compiler.options.output && compiler.options.output.path) {
      compiler.outputPath = compiler.options.output.path;
    }
  }
}

if (!rumConfig?.realm || !rumConfig?.applicationName) {
  throw new Error("rumConfig.realm and rumConfig.applicationName are required for source map upload.");
}

module.exports = (env, argv) => {
  const isProd = argv.mode === "production";
  const accessToken = process.env.SPLUNK_ORG_ACCESS_TOKEN || process.env.SPLUNK_ACCESS_TOKEN;
  const realm = process.env.SPLUNK_REALM || rumConfig.realm;
  if (!accessToken && isProd) {
    throw new Error("Set SPLUNK_ORG_ACCESS_TOKEN (or SPLUNK_ACCESS_TOKEN). This must be an org access token, not the RUM ingest token.");
  }

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
      alias: {
        "@cfallwell/rumbootstrap": path.resolve(__dirname, "../spa-npm/src/index.ts"),
        react: path.resolve(__dirname, "node_modules/react"),
        "react-dom": path.resolve(__dirname, "node_modules/react-dom"),
        "react-router-dom": path.resolve(__dirname, "node_modules/react-router-dom"),
      },
      extensions: [".ts", ".tsx", ".js"],
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          resolve: {
            fullySpecified: false,
          },
        },
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
      new EnsureOutputPathPlugin(),
      ...(isProd
        ? [
            new SplunkRumWebpackPlugin({
              applicationName: rumConfig.applicationName,
              version,
              sourceMaps: {
                token: accessToken || "",
                realm,
                disableUpload: !isProd,
              },
            }),
          ]
        : []),
    ],
    devServer: {
      static: [path.resolve(__dirname, "public"), path.resolve(__dirname, "dist")],
      historyApiFallback: true,
      port: 5173,
      open: true,
    },
  };
};
