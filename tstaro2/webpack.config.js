module.exports = {
    entry: './src/jsx/app.jsx',
    output: {
        filename: './public/javascripts/app.js'
    },
    devtool: 'inline-source-map',
    module: {
        loaders: [
            { test: /\.jsx$/, loader: 'jsx-loader' }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    }
};