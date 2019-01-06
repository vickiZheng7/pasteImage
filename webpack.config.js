const path = require("path");
const

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        filename: "pasteImage.js",
        path: path.resolve(__dirname, "dist"),
        library: "PasteImage",
        libraryTarget: "umd"
    },
    modules: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            }
        ]
    }
};