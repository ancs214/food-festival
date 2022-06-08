const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const path = require("path");
const webpack = require("webpack");
const WebpackPwaManifest = require("webpack-pwa-manifest");

const config = {
  entry: {
    app: "./assets/js/script.js",
    events: "./assets/js/events.js",
    schedule: "./assets/js/schedule.js",
    tickets: "./assets/js/tickets.js"
  },  
    output: {
      path: path.resolve(__dirname + '/dist'),
      //The name of each attribute in the entry object will be used in place of [name] in each bundle.js file that is created.
      filename: "[name].bundle.js"
    },
    module: {
      //This object will identify the type of files to pre-process using the test property to find a regex (any img file w extension of .jpg)
      rules: [
        {
          test: /\.jpg$/i,
          use: [
            {
              loader: "file-loader",
              //to rename our dist/img files and re-path them to dist/assets folder
              options: {
                esModule: false,
                name (file) {
                  return "[path][name].[ext]"
                },
                publicPath: function(url) {
                  return url.replace("../", "/assets/")
                }
              }  
            },
            {
              loader: 'image-webpack-loader'
            }
          ]
          
        }
      ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
          }),
          new BundleAnalyzerPlugin({
            analyzerMode: "static", // will generate a report.html file in the dist folder
          }),
          new WebpackPwaManifest({
            name: "Food Event",
            short_name: "Foodies",
            description: "An app that allows you to view upcoming food events.",
            start_url: "../index.html",
            background_color: "#01579b",
            theme_color: "#ffffff",
            //Fingerprints tell webpack whether or not it should generate unique fingerprints so that each time a new manifest is generated, it looks like this: manifest.lhge325d.json
            fingerprints: false,
            //inject property determines whether the link to the manifest.json is added to the HTML
            inject: false,
            icons: [{
              //path of the image we want to use
              src: path.resolve("assets/img/icons/icon-512x512.png"),
              sizes: [96, 128, 192, 256, 384, 512],
              //where icons will be sent
              destination: path.join("assets", "icons")
            }]
          })
    ],
    mode: 'development'
  };

  module.exports = config;