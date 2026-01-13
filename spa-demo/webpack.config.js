require("ts-node/register/transpile-only");
const { SplunkRumWebpackPlugin } = require("@splunk/rum-build-plugins");
const { rumConfig } = require("./src/rum.config.ts");

if (!rumConfig?.realm || !rumConfig?.environment || !rumConfig?.rumAccessToken) {
  throw new Error("rumConfig realm, environment, and rumAccessToken are required for source map upload.");
}

module.exports = {
  devtool: "source-map", // Required for source map upload
  plugins: [
    new SplunkRumWebpackPlugin({
      sourceMaps: {
        realm: rumConfig.realm,
        token: rumConfig.rumAccessToken,
        environment: rumConfig.environment,
        disableUpload: process.env.NODE_ENV !== "production",
      },
    }),
  ],
};
