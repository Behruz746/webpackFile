/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "development", // production

  entry: {
    main: path.resolve(__dirname, "src/js/main.js"),
    login: path.resolve(__dirname, "src/js/login.js"),
  },

  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name][contenthash].js",
    clean: true,
  },

  devServer: {
    static: {
      directory: path.resolve(__dirname, "dist"),
    },

    port: 3000,
    open: true,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.s|css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },

      {
        test: /\.(?:js|mjs|cjs)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              ["@babel/preset-env", { targets: "defaults" }],
            ],
          },
        },
      },

      { // bu imglarni mabayd larnin kichkina qilib beradi
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: "image-webpack-loader",

            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      title: "Findtrend.com",
      template: "src/indexTemp.html",
      filename: "index.html",
      chunks: ["main"],
    }),

    new HtmlWebpackPlugin({
      title: "Findtrend/login.page",
      template: "src/page/loginTemp.html",
      filename: "login.html",
      chunks: ["login"],
    }),

    new MiniCssExtractPlugin(),
  ],
};
