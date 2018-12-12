const path = require("path");

module.exports = {
    entry: {
        main: "./src/main.js"
    },
    output: {
        filename: "[name].[chunkhash].bundle.js",
        path: path.resolve(__dirname, "dist")
    }
};

