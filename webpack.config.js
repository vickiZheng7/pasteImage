const path = require("path");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = (env = {}) => {
    return {
        mode: "production",
        entry: "./src/index.js",
        output: {
            filename: env.production ? "pasteImage.min.js" : "pasteImage.js",
            path: path.resolve(__dirname, "dist"),
            library: "PasteImage",
            libraryTarget: "umd"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    loader: 'babel-loader'
                }
            ]
        },
        optimization: {
            minimize: env.production ? true : false,
            minimizer: [
                new UglifyJsPlugin()
            ]
        }
    }
}