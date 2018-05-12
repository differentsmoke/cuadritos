const Webpack = require("webpack");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const lifecyle = process.env.npm_lifecyle_event;

const mode = lifecyle === "start" ? "development" : "production";

const HTML = new HTMLWebpackPlugin({
    template: "./src/index.ejs"
});

const base = {
    mode,
    entry: "./src/index.js",
    output: {
        path: __dirname + "/dist/",
        filename: "app.min.js"
    },
    devServer: {
        contentBase: "./dist"
    },
    plugins: [HTML]
};

const dev = {};

const prod = {};

if (mode === "development") {
    module.exports = Object.assign(base, dev);
} else {
    module.exports = Object.assign(base, prod);
}
