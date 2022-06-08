const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },  
    output: {
      path: path.resolve(__dirname, 'dist'),
      //The name of each attribute in the entry object will be used in place of [name] in each bundle.js file that is created.
      filename: "[name].bundle.js"
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: "static", // will generate a report.html file in the dist folder
          })
    ],
    mode: 'development'
  };