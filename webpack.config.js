const path = require('path')
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');


module.exports = {
    mode: "development",
    entry: ["@babel/polyfill", "./src/index.tsx"],
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[hash].js",
        publicPath: '',
    },
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist'),
        },
        port: 3000,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx',],
        alias: {
            '@': path.join(__dirname, 'src'),
        },
    },
    plugins: [
        new HtmlWebpackPlugin({template: './src/index.html'}),
        new CleanWebpackPlugin(),
        new Dotenv(),
    ],
    module: {
        rules: [
            {
                test: /\.(css|sass|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader", 'postcss-loader']
            }, {
                test: /\.(png|eot|woff|woff2|ttf|otf)$/,
                use: ["file-loader"]
            }, {
                test: /\.(png|woff|woff2|eot|ttf|otf)$/,
                use: ['url-loader?limit=100000']
            }, {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            }, {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react']
                    }
                }
            }, {
                test: /\.tsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env', '@babel/preset-react', "@babel/preset-typescript"]
                    }
                }
            }, {
                test: /\.svg$/,
                use: [{
                    loader: "@svgr/webpack",
                    options: {
                        typescript: true,
                        ext: "tsx",
                    }
                }]
            },
        ]
    }
}